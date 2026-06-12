# Deploying DockRx to Cloudflare

This repo deploys as three Cloudflare projects:

- `frontend`: patient Vite React app on Cloudflare Pages.
- `admin`: admin/doctor Vite React app on Cloudflare Pages.
- `backend`: Express API adapted to Cloudflare Workers.

The backend uses MongoDB Atlas for database storage and Cloudflare KV for uploaded profile/doctor images.

## Prerequisites

- Node.js 20 or newer.
- npm 10 or newer.
- A Cloudflare account.
- A MongoDB Atlas cluster.
- Razorpay and Stripe credentials if payment routes will be used.

## 1. Install Dependencies

```bash
cd frontend
npm install

cd ../admin
npm install

cd ../backend
npm install
```

## 2. Authenticate Wrangler

```bash
npx wrangler login
npx wrangler whoami
```

Copy the Cloudflare Account ID from `wrangler whoami`.

## 3. Create MongoDB Atlas Access

1. Create or select a MongoDB Atlas cluster.
2. Create a database user with read/write access.
3. In Network Access, allow `0.0.0.0/0`.
4. Copy the URI without a database suffix, for example:

```text
mongodb+srv://USER:PASSWORD@cluster0.example.mongodb.net
```

The backend appends `/DockRx` in `backend/config/mongodb.js`.

## 4. Create KV Image Storage

From the `backend` directory:

```bash
npx wrangler kv namespace create IMAGES_KV
```

Copy the returned namespace id into `backend/wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "IMAGES_KV"
id = "YOUR_KV_NAMESPACE_ID"
```

## 5. Verify Worker Config

`backend/wrangler.toml` should use Node compatibility flags and required secrets:

```toml
name = "dockrx"
main = "_worker.js"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]
minify = true

[vars]
NODE_ENV = "production"

[secrets]
required = [
  "MONGODB_URI",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "CURRENCY",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "STRIPE_SECRET_KEY",
  "FRONTEND_URL",
  "ADMIN_URL",
]

[[kv_namespaces]]
binding = "IMAGES_KV"
id = "YOUR_KV_NAMESPACE_ID"
```

Do not place secret values in `wrangler.toml`.

## 6. Local Backend Development

For local Worker testing, create `backend/.dev.vars`:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.example.mongodb.net
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-strong-password
CURRENCY=INR
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=replace-with-razorpay-secret
STRIPE_SECRET_KEY=sk_test_xxxxx
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

Run the Worker locally:

```bash
cd backend
npx wrangler dev
```

Use plain Node mode only for basic API development:

```bash
cd backend
npm run server
```

Image upload and `/api/images/:key` require the Cloudflare KV binding, so test those through `wrangler dev` or the deployed Worker.

## 7. Deploy Backend

Create a local `backend/.worker-secrets.json` file when deploying manually:

```json
{
  "MONGODB_URI": "mongodb+srv://USER:PASSWORD@cluster0.example.mongodb.net",
  "JWT_SECRET": "replace-with-a-long-random-secret",
  "ADMIN_EMAIL": "admin@example.com",
  "ADMIN_PASSWORD": "replace-with-a-strong-password",
  "CURRENCY": "INR",
  "RAZORPAY_KEY_ID": "rzp_live_xxxxx",
  "RAZORPAY_KEY_SECRET": "replace-with-razorpay-secret",
  "STRIPE_SECRET_KEY": "sk_live_xxxxx",
  "FRONTEND_URL": "https://dockrx-frontend.pages.dev",
  "ADMIN_URL": "https://dockrx-admin.pages.dev"
}
```

Deploy:

```bash
cd backend
npx wrangler deploy --secrets-file .worker-secrets.json
```

Do not commit `.worker-secrets.json`.

## 8. Deploy Frontend

Build with production values:

PowerShell:

```powershell
cd frontend
$env:VITE_BACKEND_URL="https://dockrx.YOUR_SUBDOMAIN.workers.dev"
$env:VITE_CURRENCY="₹"
$env:VITE_RAZORPAY_KEY_ID="rzp_live_xxxxx"
npm run build
npx wrangler pages deploy dist --project-name=dockrx-frontend
```

Bash:

```bash
cd frontend
VITE_BACKEND_URL="https://dockrx.YOUR_SUBDOMAIN.workers.dev" \
VITE_CURRENCY="₹" \
VITE_RAZORPAY_KEY_ID="rzp_live_xxxxx" \
npm run build
npx wrangler pages deploy dist --project-name=dockrx-frontend
```

## 9. Deploy Admin

PowerShell:

```powershell
cd admin
$env:VITE_BACKEND_URL="https://dockrx.YOUR_SUBDOMAIN.workers.dev"
$env:VITE_CURRENCY="₹"
npm run build
npx wrangler pages deploy dist --project-name=dockrx-admin
```

Bash:

```bash
cd admin
VITE_BACKEND_URL="https://dockrx.YOUR_SUBDOMAIN.workers.dev" \
VITE_CURRENCY="₹" \
npm run build
npx wrangler pages deploy dist --project-name=dockrx-admin
```

## 10. GitHub Actions Secrets

Add these repository secrets under GitHub Settings, Secrets and variables, Actions:

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
MONGODB_URI
JWT_SECRET
ADMIN_EMAIL
ADMIN_PASSWORD
CURRENCY
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
STRIPE_SECRET_KEY
FRONTEND_URL
ADMIN_URL
VITE_BACKEND_URL
VITE_CURRENCY
VITE_RAZORPAY_KEY_ID
```

The workflow in `.github/workflows/deploy.yml` writes the Worker secrets into a temporary `.worker-secrets.json` file during CI and deploys with:

```bash
wrangler deploy --secrets-file .worker-secrets.json
```

## 11. Verify Deployment

1. Open the backend Worker root URL and confirm it returns `DockRx API Working`.
2. Open the admin app and log in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
3. Add a doctor with an image. This verifies MongoDB writes and KV image storage.
4. Open the frontend app and confirm the doctor list loads from the Worker.
5. Register a user and book an appointment.
6. Test Razorpay and Stripe only after their live/test keys are correctly configured.

## Troubleshooting

| Problem | Likely Cause | Fix |
| :--- | :--- | :--- |
| CORS error | `FRONTEND_URL` or `ADMIN_URL` does not exactly match the browser origin. | Update the Worker secret with no trailing slash and redeploy. |
| Image upload fails | `IMAGES_KV` binding is missing or wrong. | Check the KV namespace id in `backend/wrangler.toml`. |
| Payment route fails | Payment secrets or `CURRENCY` are missing. | Set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `STRIPE_SECRET_KEY`, and `CURRENCY`. |
| Frontend Razorpay checkout fails | Missing build-time Razorpay key. | Set `VITE_RAZORPAY_KEY_ID` before building frontend. |
| Worker deploy fails with missing secrets | A required secret is absent. | Add the missing key to `.worker-secrets.json` or GitHub Actions secrets. |
| MongoDB connection fails | Atlas network access blocks Cloudflare edge traffic. | Allow `0.0.0.0/0` in MongoDB Atlas Network Access. |
