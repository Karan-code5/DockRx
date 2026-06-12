# DockRx

DockRx is a full-stack doctor appointment booking app with three parts:

- `frontend`: patient website built with React + Vite.
- `admin`: admin and doctor dashboard built with React + Vite.
- `backend`: Express.js API connected to MongoDB Atlas and Cloudinary.

## Deployment Plan

This repo uses the working free deployment path:

| Part | Platform |
| --- | --- |
| Patient frontend | Vercel |
| Admin panel | Vercel |
| Backend API | Render |
| Database | MongoDB Atlas |
| Images | Cloudinary |

Read the full step-by-step guide here:

[DEPLOYMENT_STRATEGY.md](./DEPLOYMENT_STRATEGY.md)

## Local Setup

Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

Create local env files from the examples:

```text
backend/.env.example  -> backend/.env
frontend/.env.example -> frontend/.env
admin/.env.example    -> admin/.env
```

Run the apps in three terminals:

```bash
cd backend
npm run server
```

```bash
cd frontend
npm run dev
```

```bash
cd admin
npm run dev
```

Local URLs:

```text
Backend:  http://localhost:4000
Frontend: http://localhost:5173
Admin:    http://localhost:5174
```

## Required Backend Environment Variables

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
```

Optional payment variables:

```text
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
STRIPE_SECRET_KEY
```

## Required Frontend Environment Variables

```text
VITE_BACKEND_URL
VITE_CURRENCY
VITE_RAZORPAY_KEY_ID
```

## Required Admin Environment Variables

```text
VITE_BACKEND_URL
VITE_CURRENCY
```

## Deployment Summary

Backend on Render:

```text
Root Directory: backend
Build Command: npm install
Start Command: node server.js
```

Frontend on Vercel:

```text
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Admin on Vercel:

```text
Root Directory: admin
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

## Security

Do not commit `.env` files. If any real secret was shared in chat, screenshots, or public commits, rotate it before production deployment.
