# 🧠 Mental Wellness Lending Page - MERN Stack

A professional and responsive mental wellness landing page built using the MERN stack. It allows users to learn about services, submit enquiries, and explore pricing packages. The admin panel supports secure login and full CRUD operations for managing pricing and enquiries.

---

## 🖼️ UI Preview

![Project Screenshot](./Frontend/public/Screenshot.png)

---

## 🚀 Live Preview

🌐 [Demo Link (If deployed)](https://your-deployment-link.com)

---

## ✨ Features

### 🌐 Public (Landing Page)
- Responsive UI with Tailwind CSS
- Informative sections (About, Services, Testimonials, Contact)
- Pricing plans loaded from MongoDB
- Contact form for enquiries

### 🔐 Admin Panel
- Admin login with JWT authentication
- Protected routes for managing data
- CRUD operations for pricing packages
- View submitted enquiries from users

---

## 🔧 Tech Stack

### 🖼 Frontend:
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

### ⚙️ Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- CORS

---

## 🔑 .env Configuration

For `Backend/.env`:

---

## 🛠️ Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/Inshiya1904/MetalWellness-Lendingpage-MERN.git
cd MetalWellness-Lendingpage-MERN
```

### 2. Install Client Dependencies
```bash
cd Frontend
npm install
```

### 3. Install Admin Dependencies
```bash
cd Admin
npm install
```

### 4. Install Server Dependencies
```bash
cd Backend
npm install
```

### 5. Start Both Servers
```bash
# Start Backend
cd Backend
npm run dev
```

### 6. In another terminal, start Frontend
```bash
cd Frontend
npm run dev
```

### 7. In another terminal, start Admin
```bash
cd Admin
npm run dev
```
