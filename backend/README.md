# AR Froid Mobile App

## 🌟 Introduction
AR Froid is a specialized mobile application designed to empower cooling and air conditioning companies to professionally present their product catalog. The platform streamlines operations by enabling seamless digital product showcasing, technical PDF uploads, and direct WhatsApp communication between clients and certified field technicians.

---

## 🎯 Problem Statement
* Traditional methods of sharing product catalogs and technical sheets manually are slow and inefficient for mobile users.
* Clients often struggle to access clear technical specifications or documentation for cooling equipment directly from their phones.
* A communication gap exists between potential clients and technical support, leading to delayed inquiries, friction in customer service, and slower response times.

---

## 💡 The Solution
* Provide a centralized, sleek, and high-performance digital product catalog accessible anytime via mobile.
* Implement a seamless PDF upload system allowing clients to instantly check technical manuals and datasheets.
* Integrate a direct WhatsApp communication channel on every product interface to bridge the gap between clients and technicians for instant consultation and support.

---

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **ORM:** Sequelize
* **Database:** SQL (MySQL / PostgreSQL)
* **Architecture:** RESTful API (MVC Pattern)
* **Tools & Version Control:** Postman, Git & GitHub

---

## 📁 Project Architecture

### 1. Backend Architecture (`/backend`)

backend/
│
├── src/
│   ├── config/       # Database and environment configurations
│   ├── controllers/  # Business logic for products, uploads, and interactions
│   ├── models/       # Sequelize database models and schemas
│   ├── routes/       # API routing definitions
│   └── app.js        # Express application setup and middleware
│
├── uploads/          # Directory for stored technical PDF files and media
├── .env              # Environment variables (ignored by Git)
├── .gitignore        # Specifies untracked files
├── package.json      # Dependencies and scripts
└── server.js         # Application entry point

2. frontend  Architecture ('frontend')
mobile-app/
│
├── src/
│   ├── assets/       # Images, icons, and fonts
│   ├── components/   # Reusable UI components (Product cards, WhatsApp buttons)
│   ├── screens/      # Mobile application views (Catalog, Details, PDF Viewer)
│   ├── services/     # API integration and HTTP communication (Axios)
│   └── App.js        # Root component
│
├── package.json      # Mobile dependencies
└── README.md