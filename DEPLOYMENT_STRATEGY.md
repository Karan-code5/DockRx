# DockRx Deployment Strategy: Zero to Hero

This project deploys with the free, working MERN-friendly setup:

| App | Platform | Why |
| --- | --- | --- |
| Patient frontend | Vercel | Vite React static app |
| Admin/doctor panel | Vercel | Vite React static app |
| Backend API | Render | Runs the Express Node server |
| Database | MongoDB Atlas | Hosted MongoDB |
| Images | Cloudinary | Stores uploaded profile and doctor images |

GitHub Pages is not used because it cannot run the Express backend.

## Important Security Note

If you pasted real MongoDB, Cloudinary, admin, Razorpay, Stripe, or Cloudflare values in chat or screenshots, rotate those secrets before final production use.

Do not commit `.env` files.

## Repo

Use this repository when Render or Vercel asks for the GitHub repo:

```text
https://github.com/karan-code5/DockRx
```

## Project Paths

| Part | Folder | Main command |
| --- | --- | --- |
| Backend | `backend` | `node server.js` |
| Patient frontend | `frontend` | `npm run build` |
| Admin panel | `admin` | `npm run build` |

## Local Files

Create these local files for testing. They are ignored by git.

### `backend/.env`

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.example.mongodb.net
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-strong-password
CURRENCY=INR
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=replace-with-razorpay-secret
STRIPE_SECRET_KEY=sk_test_xxxxx
```

### `frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=₹
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

### `admin/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=₹
```

## Local Run

Open three terminals:

```bash
cd backend
npm install
npm run server
```

```bash
cd frontend
npm install
npm run dev
```

```bash
cd admin
npm install
npm run dev
```

Local URLs:

```text
Backend:  http://localhost:4000
Frontend: http://localhost:5173
Admin:    http://localhost:5174
```

## Part 1: MongoDB Atlas

1. Open `https://www.mongodb.com/atlas`.
2. Sign in or create a free account.
3. Create a free cluster.
4. Go to `Database Access`.
5. Click `Add New Database User`.
6. Create a username and password.
7. Go to `Network Access`.
8. Click `Add IP Address`.
9. Choose `Allow Access from Anywhere`.
10. Copy your connection string.

Use the URI without a database name at the end:

```text
mongodb+srv://USER:PASSWORD@cluster0.example.mongodb.net
```

The backend adds `/DockRx` automatically in `backend/config/mongodb.js`.

## Part 2: Cloudinary

1. Open `https://cloudinary.com`.
2. Sign up for a free account.
3. Open the Cloudinary dashboard.
4. Copy:
   - Cloud name
   - API key
   - API secret

These become:

```text
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_SECRET_KEY
```

## Part 3: Deploy Backend on Render

1. Open `https://render.com`.
2. Sign in with GitHub.
3. Click `New +`.
4. Click `Web Service`.
5. Connect repo `karan-code5/DockRx`.
6. Fill the form:

| Render field | Value |
| --- | --- |
| Name | `dockrx-backend` |
| Language | `Node` |
| Branch | `main` |
| Region | closest/free available region |
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node server.js` |
| Instance Type | `Free` |

7. Add environment variables:

```text
MONGODB_URI
JWT_SECRET
ADMIN_EMAIL
ADMIN_PASSWORD
CURRENCY
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_SECRET_KEY
FRONTEND_URL
ADMIN_URL
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
STRIPE_SECRET_KEY
```

Use these temporary frontend/admin URLs until Vercel gives you final URLs:

```text
FRONTEND_URL=https://dockrx-frontend.vercel.app
ADMIN_URL=https://dockrx-admin.vercel.app
```

8. Click `Create Web Service`.
9. Wait for logs to show:

```text
DockRx Server started on PORT:10000
Database Connected
```

Your backend URL will look like:

```text
https://dockrx-backend.onrender.com
```

## Part 4: Deploy Frontend on Vercel

1. Open `https://vercel.com`.
2. Sign in with GitHub.
3. Click `Add New`.
4. Click `Project`.
5. Import repo `DockRx`.
6. Configure:

| Vercel field | Value |
| --- | --- |
| Project Name | `dockrx-frontend` |
| Framework Preset | `Vite` |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

7. Add environment variables:

```text
VITE_BACKEND_URL=https://dockrx-backend.onrender.com
VITE_CURRENCY=₹
VITE_RAZORPAY_KEY_ID=rzp_test_or_live_key_id
```

8. Click `Deploy`.

## Part 5: Deploy Admin on Vercel

1. In Vercel, click `Add New`.
2. Click `Project`.
3. Import the same repo `DockRx`.
4. Configure:

| Vercel field | Value |
| --- | --- |
| Project Name | `dockrx-admin` |
| Framework Preset | `Vite` |
| Root Directory | `admin` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

5. Add environment variables:

```text
VITE_BACKEND_URL=https://dockrx-backend.onrender.com
VITE_CURRENCY=₹
```

6. Click `Deploy`.

## Part 6: Connect Final URLs

After Vercel deployment, copy the final URLs.

In Render backend settings, update:

```text
FRONTEND_URL=https://your-real-frontend-url.vercel.app
ADMIN_URL=https://your-real-admin-url.vercel.app
```

Then redeploy the Render backend.

In both Vercel projects, confirm:

```text
VITE_BACKEND_URL=https://dockrx-backend.onrender.com
```

Redeploy frontend/admin if you changed any environment variable.

## Part 7: Final Test Checklist

1. Open backend URL. It should show:

```text
DockRx API Working
```

2. Open admin URL.
3. Log in using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
4. Add a doctor with an image.
5. Open frontend URL.
6. Confirm doctors load.
7. Register a user.
8. Book an appointment.
9. Test payments only after payment keys are configured.

## Common Fixes

| Problem | Fix |
| --- | --- |
| Frontend loads but no doctors show | Check `VITE_BACKEND_URL` in Vercel frontend project |
| Admin cannot login | Check Render `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET` |
| Image upload fails | Check Render Cloudinary variables |
| MongoDB connection fails | Check Atlas URI and Network Access `0.0.0.0/0` |
| Vercel says wrong framework | Set Framework Preset to `Vite` |
| Render service sleeps | Free Render services sleep after inactivity; first request can be slow |
