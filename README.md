# 🛒 Next.js E-commerce App

A full-featured, modern e-commerce platform built with **Next.js 15**, designed to provide a seamless shopping experience with secure authentication, payments, cart management, and order processing.

## 🚀 Live Demo

🔗 [Live Site](https://nextjs-ecom-ochre.vercel.app)

## 🧩 Features

- 🔐 User authentication (Email/Password + Google & Github OAuth)
- 🛍️ Product listing & detail pages
- 🛒 Add to cart and checkout system
- 💳 Cashfree payment gateway integration (client-side only, no webhook)
- 📧 Email sending with Nodemailer
- 📄 Invoice generation using jsPDF
- 🌐 SWR for client-side data fetching
- 🎨 Tailwind CSS for responsive design
- 🔒 Protected routes with NextAuth and middleware

---

## 🛠️ Tech Stack

### Frontend:
- **Next.js 15 (App Router)**
- **React 18**
- **Tailwind CSS**
- **SWR (stale-while-revalidate)**

### Backend:
- **Next.js API Routes**
- **Prisma ORM with MongoDB**

### Auth & Payments:
- **NextAuth.js**
- **Google & Github OAuth**
- **Cashfree Payment Gateway (basic client-side integration only; webhook not integrated due to unverified test account)**

### Tools & Utilities:
- **Axios** – API requests
- **Bcrypt** – Password hashing
- **Date-fns** – Date formatting
- **Nodemailer** – Email service
- **jsPDF & jsPDF-AutoTable** – PDF generation
- **React Hook Form** – Form management
- **React Icons** – Icon library
- **React Hot Toast** – Toast notifications

---

## 📂 Project Structure

```bash
project/
  ├── middleware.js      # Middleware for route protection (auth guard)
  ├── prisma/
  │   └── schema.prisma  # Prisma schema for MongoDB

  app/
  ├── api/               # API endpoints (auth, checkout, etc.)
  ├── _actions/          # Next.js Server Actions (e.g., product logic, current user)
  ├── _context/          # React Contexts (e.g., Auth context, Toast context)
  ├── _components/       # Reusable UI components (buttons, forms)
  ├── _utils/            # Utility/helper functions
  ├── _hooks/            # Custom hooks (e.g., useCart, useOrders)
  ├── _libs/             # Core libraries (e.g., prismadb, emailSender)
  ├── account/           # User account info and settings
  ├── cart/              # User's shopping cart
  ├── login/             # Login page
  ├── order/             # User's order summary/history
  ├── revalidate/        # Route for revalidating static pages using secret key
  ├── products/          # Products listing route
  │   └── [productId]/   # Dynamic product details page
  ├── layout.js          # Root layout for the app
  ├── globals.css        # Global Tailwind styles
  ├── page.js            # Homepage (landing page)
  └── not-found.js       # Custom 404 error page
```

🛠 **Note:**

- The **admin panel is hosted separately** and is not embedded in this project.  
- The `/revalidate` route is used to **manually trigger static page regeneration data** (SSG) using a secure `revalidate-key`.

===

# 🧪 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/aman8990/nextjs-ecom.git
cd nextjs-ecom

npm install

# Database (MongoDB via Prisma)
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Cashfree Payment Gateway (Client-side only)
CASHFREE_CLIENT_ID=your_cashfree_client_id
CASHFREE_CLIENT_SECRET=your_cashfree_client_secret

# Nodemailer / Email
EMAIL_SERVER_USER=your_email@example.com
EMAIL_SERVER_PASSWORD=your_email_password
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=your_email@example.com

# Static Site Revalidation Secret
REVALIDATE_SECRET=your_custom_revalidate_key


npx prisma generate

npm run dev

