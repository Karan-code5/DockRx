# GitHub Actions Secrets

Add these values in GitHub under:

```text
Repository settings > Secrets and variables > Actions > New repository secret
```

Required deployment secrets:

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

Use these formats:

```text
CLOUDFLARE_ACCOUNT_ID=your 32-character Cloudflare account id
CLOUDFLARE_API_TOKEN=Cloudflare API token with Workers, KV, and Pages edit permissions
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.example.mongodb.net
JWT_SECRET=a long random string
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=a strong password
CURRENCY=INR
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your Razorpay secret
STRIPE_SECRET_KEY=sk_live_xxxxx
FRONTEND_URL=https://dockrx-frontend.pages.dev
ADMIN_URL=https://dockrx-admin.pages.dev
VITE_BACKEND_URL=https://dockrx.YOUR_SUBDOMAIN.workers.dev
VITE_CURRENCY=₹
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

Do not commit real secret values into this repository.

## Cloudflare API Token

Create this in the Cloudflare dashboard:

1. Open `https://dash.cloudflare.com/profile/api-tokens`.
2. Choose `Create Token`.
3. Use a custom token or the Workers edit template.
4. Grant these account permissions:
   - `Workers Scripts: Edit`
   - `Workers KV Storage: Edit`
   - `Cloudflare Pages: Edit`
5. Restrict the token to your Cloudflare account.
6. Copy the token once and save it as `CLOUDFLARE_API_TOKEN` in GitHub Actions secrets.
