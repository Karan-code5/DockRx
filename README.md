<div align="center">

![DockRx Banner](./docs/banner.png)

# 🏥 DockRx

### Smart Doctor Appointment Booking Platform

[![Live Frontend](https://img.shields.io/badge/Live-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dockrx-frontend.vercel.app)
[![Live Admin](https://img.shields.io/badge/Live-Admin%20Panel-818cf8?style=for-the-badge&logo=vercel&logoColor=white)](https://dockrx-admin.vercel.app)
[![API Status](https://img.shields.io/badge/API-Live-22c55e?style=for-the-badge&logo=render&logoColor=white)](https://dockrx-backend.onrender.com)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/atlas)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend%20%26%20Admin-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=flat-square&logo=render&logoColor=black)](https://render.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Zero-to-Hero Local Setup](#-zero-to-hero-local-setup)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 Deployment Guide](#-deployment-guide)
- [🔄 CI/CD with GitHub Actions](#-cicd-with-github-actions)
- [🤝 Contributing](#-contributing)
- [🛡️ Security](#️-security)
- [📄 License](#-license)

---

## ✨ Features

### 🧑‍⚕️ Patient (Frontend)
- 🔐 **Secure Auth** — Register & login with JWT-based authentication
- 🩺 **Doctor Discovery** — Browse doctors by speciality with real-time search & filters
- 📅 **Appointment Booking** — Pick a doctor, choose an available slot, confirm instantly
- 💳 **Online Payment** — Pay via **Razorpay** or **Stripe** (test & live keys supported)
- 👤 **Profile Management** — Update personal info, photo, and view appointment history
- ❌ **Cancellation** — Cancel upcoming appointments with one click

### 🛡️ Admin Panel
- 👨‍💼 **Doctor Management** — Add, edit, update availability of doctors with photo upload
- 📊 **Dashboard Stats** — Total doctors, patients, and appointments at a glance
- 📋 **Appointment Control** — View all appointments, confirm or cancel any booking
- 💰 **Earnings Tracker** — Monitor doctor-wise earnings

### 🩺 Doctor Portal (Admin Panel)
- 📆 **My Appointments** — View upcoming and past appointments
- ✅ **Mark Completed** — Update appointment status after consultation
- 💵 **My Earnings** — Track total and pending earnings

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph Client ["👥 Clients"]
        P["Patient Browser\nReact Frontend"]
        A["Admin/Doctor Browser\nReact Admin"]
    end

    subgraph Vercel ["▲ Vercel (Free)"]
        FP["Vercel Project\ndockrx-frontend"]
        AP["Vercel Project\ndockrx-admin"]
    end

    subgraph Render ["🟢 Render (Free)"]
        API["Web Service\nExpress API"]
    end

    subgraph External ["🔌 External Services"]
        DB[("MongoDB Atlas")]
        CDN["Cloudinary\nImages"]
        RZ[Razorpay]
        ST[Stripe]
    end

    P --> FP
    A --> AP
    FP --> API
    AP --> API
    API --> DB
    API --> CDN
    API --> RZ
    API --> ST
```

---

## 🛠️ Tech Stack

| Area | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + Vite | Patient-facing SPA |
| **Admin** | React 18 + Vite | Admin & doctor portal |
| **Styling** | TailwindCSS 3 | Utility-first CSS |
| **Backend** | Express.js | REST API |
| **Frontend Hosting** | Vercel | Free static hosting with CDN |
| **Admin Hosting** | Vercel | Free static hosting with CDN |
| **Backend Hosting** | Render | Free Node.js hosting |
| **Database** | MongoDB Atlas | Persistent data store |
| **Images** | Cloudinary | Doctor/patient profile images |
| **Auth** | JWT + bcryptjs | Secure token-based auth |
| **Payments** | Razorpay + Stripe | Dual payment gateway |

---

## 📁 Project Structure

```
DockRx/
├── 📁 frontend/               # Patient-facing React app
│   ├── src/
│   │   ├── components/        # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── context/           # React Context (AppContext for global state)
│   │   ├── pages/             # Route-level pages
│   │   │   ├── Home.jsx
│   │   │   ├── Doctors.jsx    # Browse & filter doctors
│   │   │   ├── Appointment.jsx# Book a slot
│   │   │   ├── MyAppointments.jsx
│   │   │   ├── MyProfile.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Verify.jsx     # Payment verification
│   │   └── App.jsx
│   ├── .env.example
│   └── vite.config.js
│
├── 📁 admin/                  # Admin & doctor portal React app
│   ├── src/
│   │   ├── components/
│   │   ├── context/           # AdminContext + DoctorContext
│   │   └── pages/
│   ├── .env.example
│   └── vite.config.js
│
├── 📁 backend/                # Express API (runs as Cloudflare Worker)
│   ├── config/
│   │   └── mongodb.js         # MongoDB Atlas connection
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── doctorController.js
│   │   └── userController.js
│   ├── middleware/             # Auth middleware (JWT verify)
│   ├── models/
│   │   ├── appointmentModel.js
│   │   ├── doctorModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── adminRoute.js
│   │   ├── doctorRoute.js
│   │   ├── userRoute.js
│   │   └── imageRoute.js
│   ├── utils/
│   ├── _worker.js             # Cloudflare Worker entry point
│   ├── server.js              # Plain Node.js entry point (local dev)
│   ├── wrangler.toml          # Cloudflare Worker config
│   └── .env.example
│
├── 📁 .github/
│   ├── workflows/
│   │   └── deploy.yml         # GitHub Actions CI/CD pipeline
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── 📁 docs/
│   └── banner.png
│
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
└── README.md
```

---

## ⚡ Zero-to-Hero Local Setup

Follow these steps exactly from a **fresh clone** to a **fully running local environment**.

### Prerequisites

Make sure these are installed before starting:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | ≥ 20 | [nodejs.org](https://nodejs.org) |
| **npm** | ≥ 10 (comes with Node) | — |
| **Git** | Any recent | [git-scm.com](https://git-scm.com) |
| **MongoDB Atlas** | Free tier | [mongodb.com/atlas](https://mongodb.com/atlas) |

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Karan-code5/DockRx.git
cd DockRx
```

---

### Step 2 — Set Up MongoDB Atlas

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and **Create a Free Cluster**.
2. Click **Database Access** → **Add New Database User**:
   - Username: `dockrx_user`
   - Password: (generate a strong password, save it)
   - Role: **Read and write to any database**
3. Click **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)
4. Click **Clusters** → **Connect** → **Connect your application** → Copy the URI:
   ```
   mongodb+srv://dockrx_user:<password>@cluster0.xxxxx.mongodb.net
   ```
   > ⚠️ Replace `<password>` with your actual password. Do NOT include a database name at the end.

---

### Step 3 — Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and fill in all values:

```env
MONGODB_URI=mongodb+srv://dockrx_user:<password>@cluster0.xxxxx.mongodb.net
JWT_SECRET=replace-with-a-very-long-random-string-at-least-64-chars
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourStrongAdminPassword123!
CURRENCY=INR
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=sk_test_xxxxx
```

> 📌 **Cloudinary** is used for image uploads in local Node mode. Sign up free at [cloudinary.com](https://cloudinary.com).

> 📌 **Razorpay & Stripe** — test keys work without real transactions. Sign up and get test keys from their dashboards. Payment routes will fail gracefully if keys are absent.

---

### Step 4 — Install Backend Dependencies & Start

```bash
# Still in the backend/ directory
npm install
npm run server
```

You should see:
```
DockRx Server started on PORT:4000
MongoDB Connected
```

> 💡 `npm run server` uses **nodemon** for hot-reload on file changes.

---

### Step 5 — Configure Frontend Environment

Open a **new terminal tab/window**:

```bash
cd frontend
cp .env.example .env
```

Open `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=₹
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

---

### Step 6 — Install Frontend Dependencies & Start

```bash
# In the frontend/ directory
npm install
npm run dev
```

Frontend will start at: **http://localhost:5173**

---

### Step 7 — Configure Admin Panel Environment

Open a **third terminal tab/window**:

```bash
cd admin
cp .env.example .env
```

Open `admin/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=₹
```

---

### Step 8 — Install Admin Dependencies & Start

```bash
# In the admin/ directory
npm install
npm run dev
```

Admin panel will start at: **http://localhost:5174**

---

### Step 9 — Verify Everything Works

| Service | URL | Expected |
|---|---|---|
| **Backend API** | http://localhost:4000 | `DockRx API Working` |
| **Frontend** | http://localhost:5173 | Home page with doctor listing |
| **Admin Panel** | http://localhost:5174 | Login page |

**Login to Admin:**  
Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you set in `backend/.env`.

---

### Summary — All Commands at a Glance

```bash
# Clone
git clone https://github.com/Karan-code5/DockRx.git && cd DockRx

# Backend
cd backend && cp .env.example .env
# → edit .env with your values
npm install && npm run server

# Frontend (new terminal)
cd frontend && cp .env.example .env
# → edit .env with your values
npm install && npm run dev

# Admin (new terminal)
cd admin && cp .env.example .env
# → edit .env with your values
npm install && npm run dev
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string (no trailing database name) |
| `JWT_SECRET` | ✅ | Long random string for signing JWT tokens |
| `ADMIN_EMAIL` | ✅ | Admin login email |
| `ADMIN_PASSWORD` | ✅ | Admin login password |
| `CURRENCY` | ✅ | Currency code, e.g. `INR` or `USD` |
| `CLOUDINARY_NAME` | ✅ (local) | Cloudinary cloud name for image uploads |
| `CLOUDINARY_API_KEY` | ✅ (local) | Cloudinary API key |
| `CLOUDINARY_SECRET_KEY` | ✅ (local) | Cloudinary API secret |
| `RAZORPAY_KEY_ID` | ⚠️ | Razorpay key ID (payment optional) |
| `RAZORPAY_KEY_SECRET` | ⚠️ | Razorpay secret key |
| `STRIPE_SECRET_KEY` | ⚠️ | Stripe secret key |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_BACKEND_URL` | ✅ | Full URL of the backend API |
| `VITE_CURRENCY` | ✅ | Currency symbol shown in UI, e.g. `₹` or `$` |
| `VITE_RAZORPAY_KEY_ID` | ⚠️ | Public Razorpay key for checkout |

### Admin (`admin/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_BACKEND_URL` | ✅ | Full URL of the backend API |
| `VITE_CURRENCY` | ✅ | Currency symbol shown in UI |

---

## 🚀 Deployment Guide

DockRx is deployed using **100% free** services:

| Component | Platform | Free URL |
|---|---|---|
| Frontend | [Vercel](https://vercel.com) | `https://dockrx-frontend.vercel.app` |
| Admin Panel | [Vercel](https://vercel.com) | `https://dockrx-admin.vercel.app` |
| Backend API | [Render](https://render.com) | `https://dockrx-backend.onrender.com` |
| Database | [MongoDB Atlas](https://mongodb.com/atlas) | Free 512MB cluster |
| Images | [Cloudinary](https://cloudinary.com) | Free 25GB storage |

> 💡 **Also supports Cloudflare** — see [CLOUDFLARE_DEPLOYMENT_GUIDE.md](./CLOUDFLARE_DEPLOYMENT_GUIDE.md) if you prefer that route.

---

### 🟢 Deploy Backend to Render (Free)

**Step 1** — Go to [render.com](https://render.com) and sign up with GitHub.

**Step 2** — Click **New → Web Service** → Connect your `DockRx` repo.

**Step 3** — Configure the service:

| Field | Value |
|---|---|
| **Name** | `dockrx-backend` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

**Step 4** — Add Environment Variables in Render dashboard → **Environment** tab:

```
MONGODB_URI          = mongodb+srv://user:pass@cluster.mongodb.net
JWT_SECRET           = (long random string)
ADMIN_EMAIL          = admin@example.com
ADMIN_PASSWORD       = YourStrongPass!
CURRENCY             = INR
CLOUDINARY_NAME      = your_cloud_name
CLOUDINARY_API_KEY   = your_api_key
CLOUDINARY_SECRET_KEY= your_secret
FRONTEND_URL         = https://dockrx-frontend.vercel.app
ADMIN_URL            = https://dockrx-admin.vercel.app
```

**Step 5** — Click **Create Web Service**. Your backend URL:
```
https://dockrx-backend.onrender.com
```

> ⚠️ **Cold Start**: Render free tier sleeps after 15 minutes of inactivity. First request after idle takes ~30 seconds. Normal for free tier.

---

### ▲ Deploy Frontend to Vercel (Free)

**Step 1** — Go to [vercel.com](https://vercel.com) → Sign up with GitHub.

**Step 2** — Click **Add New → Project** → Import your `DockRx` repo.

**Step 3** — Configure:

| Field | Value |
|---|---|
| **Root Directory** | `frontend` |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

**Step 4** — Add Environment Variables:

| Variable | Value |
|---|---|
| `VITE_BACKEND_URL` | `https://dockrx-backend.onrender.com` |
| `VITE_CURRENCY` | `₹` |
| `VITE_RAZORPAY_KEY_ID` | `rzp_test_xxxxx` |

**Step 5** — Click **Deploy**. Frontend URL:
```
https://dockrx-frontend.vercel.app
```

---

### ▲ Deploy Admin to Vercel (Free)

Repeat the same steps as Frontend but:
- **Root Directory** → `admin`
- **Environment Variables**: `VITE_BACKEND_URL` + `VITE_CURRENCY` only

Admin URL:
```
https://dockrx-admin.vercel.app
```

---

## 🔄 CI/CD with GitHub Actions

The repository includes a production-ready CI/CD pipeline at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

**Triggers:** Every push to `main` auto-deploys all three apps. You can also trigger individual deploys via the **Actions** tab.

### Setup — Add GitHub Secrets

Go to **GitHub → Your Repo → Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | From `npx wrangler whoami` |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → API Tokens |
| `MONGODB_URI` | Atlas connection string |
| `JWT_SECRET` | Same as in `.env` |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `CURRENCY` | e.g. `INR` |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `FRONTEND_URL` | Deployed frontend URL (no trailing slash) |
| `ADMIN_URL` | Deployed admin URL (no trailing slash) |
| `VITE_BACKEND_URL` | Deployed worker URL |
| `VITE_CURRENCY` | e.g. `₹` |
| `VITE_RAZORPAY_KEY_ID` | Public Razorpay key |

Once set, every push to `main` will:
1. Build and deploy **Frontend** to Cloudflare Pages
2. Build and deploy **Admin** to Cloudflare Pages
3. Bundle and deploy **Backend** to Cloudflare Workers

---

## 🔧 Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| `MongoDB connection failed` | Atlas network access blocks your IP | Allow `0.0.0.0/0` in Atlas Network Access |
| `CORS error in browser` | Backend `FRONTEND_URL` / `ADMIN_URL` mismatch | Set exact URL with no trailing slash |
| `Image upload fails` | Missing Cloudinary keys (local) or KV binding (prod) | Add Cloudinary keys to `.env`, or check `wrangler.toml` KV binding |
| `Razorpay checkout fails` | Missing `VITE_RAZORPAY_KEY_ID` at build time | Set env var before `npm run build` |
| `Worker deploy fails` | Missing required secret | Add the secret to `.worker-secrets.json` or GitHub Secrets |
| `Admin login rejected` | Wrong `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Check `backend/.env` and restart server |
| `Frontend shows no doctors` | Backend is not running or wrong URL in frontend `.env` | Ensure backend is at port 4000 and `VITE_BACKEND_URL` matches |
| `npm run dev fails` | Dependencies not installed | Run `npm install` inside the correct directory |

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a PR.

1. **Fork** the repository
2. **Create** a branch: `git checkout -b feat/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your fork: `git push origin feat/your-feature-name`
5. **Open** a Pull Request against `main`

---

## 🛡️ Security

Found a security vulnerability? Please **do not** open a public GitHub issue. Read [SECURITY.md](./SECURITY.md) for responsible disclosure instructions.

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

---

<div align="center">

Made with ❤️ by [Karan](https://github.com/Karan-code5)

⭐ If this project helped you, please give it a star!

</div>
