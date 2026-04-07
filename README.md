# 🏥 MediConnect - Medical Management System

A full-stack healthcare application with a React frontend and a Spring Boot backend.

## 📋 Project Overview

MediConnect is a complete medical management system built with:
- **React + Vite** for the frontend
- **Spring Boot + Spring Data JPA** for the backend
- **MySQL** for persistent storage

The application supports role-based dashboards for Admins, Doctors, Patients, and Pharmacists.

## 🧩 What’s Included

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Vite 5.0.0
- Global state using React Context
- UI for login, role dashboards, appointments, prescriptions, orders, and admin views

### Backend
- Spring Boot 3.3.4
- Spring Web
- Spring Data JPA
- MySQL connector
- REST APIs for authentication, users, doctors, appointments, prescriptions, orders, inventory, lab reports, notifications, health records, and admin operations

## 📁 Project Structure

```
Final/
├── backend/
│   ├── pom.xml
│   ├── application.properties
│   ├── src/main/java/com/mediconnect/backend/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── config/
│   └── src/main/resources/
│       └── application.properties
├── index.html
├── package.json
├── package-lock.json
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── styles/
├── vite.config.js
└── .gitignore
```

## 🚀 Quick Start

### Frontend
1. Install dependencies
   ```bash
   npm install
   ```
2. Start the frontend dev server
   ```bash
   npm run dev
   ```
3. Open the app in the browser at:
   ```text
   http://127.0.0.1:5173/
   ```

### Backend
1. Ensure MySQL is running locally on port `3306`
2. Create a database named `mediconnectdb` or let Spring Boot create it
3. Update `backend/application.properties` if needed
4. Run the backend JAR or build with Maven
   ```bash
   cd backend
   java -jar target/mediconnect-backend-0.0.1-SNAPSHOT.jar
   ```
5. The backend will run at:
   ```text
   http://127.0.0.1:8080/
   ```

## 🔧 Backend MySQL Configuration

The backend is configured to use MySQL in `backend/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mediconnectdb?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&defaultAuthenticationPlugin=mysql_native_password&createDatabaseIfNotExist=true
spring.datasource.username=mediconnect
spring.datasource.password=MediaConnect@123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
```

> If your MySQL username/password differ, update the file before starting the backend.

## 📌 Backend API Highlights

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/users`
- `GET /api/doctors`
- `POST /api/appointments`
- `PATCH /api/appointments/{id}/status`
- `POST /api/prescriptions`
- `GET /api/prescriptions/patient/{patientId}`
- `POST /api/orders`
- `PATCH /api/orders/{id}/status`
- `GET /api/inventory`
- `GET /api/lab-reports/patient/{patientId}`
- `GET /api/health-records/patient/{patientId}`
- `GET /api/admin/stats`

## 🎯 Frontend Features

- Patient appointment booking and tracking
- Doctor appointment approval and prescription creation
- Pharmacist order processing and status updates
- Admin user management, statistics, and verification
- Role-based dashboards and navigation

## 🧪 Running the App Locally

- Frontend: `http://127.0.0.1:5173/`
- Backend: `http://127.0.0.1:8080/`

## 📝 Notes

- The frontend is a complete React SPA with role-based pages.
- The backend is a Spring Boot REST API using MySQL.
- The current repository includes both frontend and backend code.
- Remove generated build artifacts from version control if you want a cleaner Git history.

## 🚀 Recommended Improvements

- Add Git LFS for large backend build artifacts
- Add a `.gitignore` entry for `backend/target/`
- Add a detailed backend README inside `backend/`
- Add Docker support for MySQL and backend
- Add automated tests for frontend and backend

## 📄 License

This project is open source under the MIT License.

---

**Built with ❤️ using React, Vite, Spring Boot, and MySQL**
