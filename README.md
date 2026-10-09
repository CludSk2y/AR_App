
# ❄️ AR Froid Mobile App
**Professional Digital Catalog & Technician Connect Platform for Cooling & AC Industries**

## 📖 Overview

**AR Froid** is a specialized mobile application designed to revolutionize product catalog presentation and field support for cooling and air conditioning companies. By combining a high-performance digital product showcase, instant technical PDF access, and direct communication channels, the platform seamlessly connects clients, field technicians, and businesses.

---

## ✨ Key Features

* **📱 Centralized Digital Catalog:** Smooth product lists optimized specifically for mobile users.
* **📄 Technical Document Management:** Integrated PDF viewer to consult manuals and data sheets (`Document.js`, `PdfViewerScreen.js`).
* **💬 WhatsApp & Support Integration:** Direct communication channels backed by dedicated support screens (`supportController.js`, `SupportScreen.js`).
* **⚡ RESTful Architecture:** A robust backend structure based on the MVC (Model-View-Controller) design pattern using Express and Sequelize.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js, Sequelize ORM, SQL (MySQL / PostgreSQL)
* **Mobile Frontend:** React Native (Expo), JavaScript, Axios
* **Tools & Version Control:** Git, GitHub, Postman

---

## 📁 Project Architecture (Based on VS Code Structure)

```text
ar-froid-project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Database configuration
│   │   ├── controllers/
│   │   │   ├── documentController.js # Business logic for documents
│   │   │   ├── productController.js  # Business logic for products
│   │   │   └── supportController.js  # Business logic for support
│   │   ├── models/
│   │   │   ├── Document.js           # Sequelize model for documents
│   │   │   ├── Product.js            # Sequelize model for products
│   │   │   ├── support.js            # Sequelize model for support
│   │   │   └── index.js              # Model initialization & relationships
│   │   ├── routes/
│   │   │   ├── documentRoutes.js     # API routes for documents
│   │   │   ├── productRoutes.js      # API routes for products
│   │   │   └── supportRoutes.js      # API routes for support
│   │   ├── app.js                    # Express app configuration & middleware
│   │   └── server.js                 # Backend server entry point
│   ├── uploads/                      # Stored files (PDFs, media)
│   ├── seed.js                       # Database seeding script
│   ├── .env                          # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── frontend/
    ├── .expo/
    ├── android/
    ├── assets/                       # Icons, images, and fonts
    ├── src/
    │   ├── screens/
    │   │   ├── CatalogScreen.js      # Catalog screen view
    │   │   ├── HomeScreen.js         # Home screen view
    │   │   ├── PdfViewerScreen.js    # PDF document viewer screen
    │   │   ├── ProductDetailsScreen.js # Product details view
    │   │   ├── SplashScreen.js       # Initial splash loading screen
    │   │   └── SupportScreen.js      # Support and contact view
    │   └── services/
    │       └── api.js                # Axios configuration and API calls
    ├── App.js                        # Root application component
    ├── app.json                      # Expo configuration
    ├── index.js
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    └── package.json

🚀 Getting Started Guide
1. Backend Setup
Navigate to the backend folder, install dependencies, and run the server:

Bash
cd backend
npm install
npm run dev

2. Frontend (Mobile) Setup
Open a new terminal window, navigate to the frontend folder, install dependencies, and start the app:

Bash
cd frontend
npm install
npx expo start

🤝 Contribution 
Contributions, issues, and feature requests are always welcome!

📝 License
by Kaoutar Kham
