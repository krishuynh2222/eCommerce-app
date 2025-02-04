# Full-Stack E-Commerce Web Application

## 🚀 Overview

This is a **full-stack e-commerce web application** that enables users to browse products, search for items, manage their cart, and complete a secure checkout. Built using **React.js** for the front-end, **TailwindCSS** for styling, and **Node.js** with **MongoDB** for the back-end, this app provides a seamless shopping experience with secure authentication and real-time inventory management.

## 🛠️ Features
- **Frontend**:
  - **Product Browsing & Search**: Easily explore and search for products.
  - **Cart Management**: Add, remove, and adjust quantities of products in the shopping cart.

- **Backend**:
  - **Secure Checkout**: Secure and smooth checkout process with user authentication.
  - **JWT Authentication**: Sign up, login, and logout with JSON Web Tokens for secure sessions.

- **Admin panel**:
  - **Add Item**: Admin can add new items to the inventory with details like name, description, price, and images.
  - **Manage Items**: Admin can update, delete, or modify existing items.
  - **View Orders**: Admin can check all customer orders, including their details (items purchased, customer info, payment status).
  - **Order Status Management**: Admin can update the status of an order (e.g., "Processing", "Shipped", "Delivered").
  
- **Mobile-Friendly**: Fully responsive design to ensure a great user experience on all devices.
- **Reusable Components**: Modular React components for easy maintainability and scalability.

## 🧑‍💻 Technologies Used
- **Frontend**:
  - **React.js**: JavaScript library for building dynamic user interfaces.
  - **TailwindCSS**: Utility-first CSS framework for custom, responsive styling.
  - **HTML & JavaScript**: Core technologies for structuring and adding interactivity to the app.
  
- **Backend**:
  - **Node.js**: JavaScript runtime for building the back-end server.
  - **MongoDB**: NoSQL database for storing product, user, and order data.
  - **JWT (JSON Web Tokens)**: Secure authentication and user authorization.

- **Admin panel**:
  - **React.js**: JavaScript library for building dynamic user interfaces.
  - **TailwindCSS**: Utility-first CSS framework for custom, responsive styling.
  - **HTML & JavaScript**: Core technologies for structuring and adding interactivity to the app.
    
## 📝 Installation & Setup

### 📋 Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** (with npm)
- **MongoDB** (locally or using MongoDB Atlas)
- **Git** (for version control)

Frontend Setup
Clone the repository:
```bash
git clone <repository-url>
```

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The frontend will be available at http://localhost:5173/ecommerce-project/

Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a .env file for environment variables (e.g., for MongoDB URI and JWT secret).

Start the backend server:
```bash
npm start
```
The backend will be available at http://localhost:4000.


Admin Setup
Navigate to the admin directory:
```bash
cd admin
```

Start the admin server:
```bash
npm run dev
```

## 🚀  Conclusion
This e-commerce web application demonstrates a full-stack development approach, integrating a modern front-end framework with a powerful back-end API. The use of MongoDB, JWT authentication, and responsive design ensures a smooth, secure, and scalable user experience.
