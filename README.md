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

---

# 🧪 Getting Started

Follow these steps to set up the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/aman8990/nextjs-ecom.git
cd nextjs-ecom
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Set Up Environment Variables

```bash
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

REVALIDATE_KEY=your_secret_key

EMAIL_USERNAME=your_name@service.com
EMAIL_PASSWORD=your_password
EMAIL_FROM=your_email@gmail.com

CASHFREE_ID=your_cashfree_client_id
CASHFREE_SECRET=your_cashfree_client_secret
```

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Start Development Server

```bash
npm run dev
```

---

## 📬 Contact

Created by [Aman Kumar](https://github.com/aman8990)  
📧 Email: [amandalal899@gmail.com](mailto:amandalal899@gmail.com)
