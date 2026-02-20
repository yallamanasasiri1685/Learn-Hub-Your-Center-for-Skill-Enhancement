# 🎓 LearnHub – Your Center for Skill Enhancement

LearnHub is a full-stack Online Learning Platform (OLP) built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform enables students to enhance their skills through structured online courses, teachers to manage and publish content, and administrators to oversee the system.

This project demonstrates full-stack development, secure authentication, role-based access control, RESTful API integration, and scalable database design.

---

## 📌 Project Overview

LearnHub provides:

- Flexible and self-paced learning
- Secure authentication system
- Role-based access (Student, Teacher, Admin)
- Course enrollment and management
- Paid course integration
- Certificate generation after course completion
- Admin monitoring dashboard

The application follows a Client-Server architecture ensuring smooth communication between frontend and backend components.

---

## 🏗 System Architecture

Frontend (React + Vite)  
⬇ Axios API Calls  
Backend (Node.js + Express.js)  
⬇ Mongoose  
MongoDB Database  

Authentication is handled using JWT middleware to protect secured routes.

---

## 👥 User Roles and Responsibilities

### 👨‍🎓 Student

- Register and Login
- Browse available courses
- Filter courses by name or category
- Enroll in free or paid courses
- Resume course from last progress
- Complete modules
- Download digital certificate upon completion

---

### 👨‍🏫 Teacher

- Create new courses
- Add sections and course content
- Manage existing courses
- Delete course (if no student enrolled)
- Monitor student enrollments

---

### 🛠 Admin

- Manage all users
- Monitor platform activity
- Modify or remove courses
- Track student enrollments
- Maintain system integrity

---

## 🛠 Technology Stack

### Frontend

- React.js
- Vite
- Bootstrap
- Material UI
- Ant Design (Antd)
- MDB React UI Kit
- React Bootstrap
- Axios

### Backend

- Node.js
- Express.js
- CORS
- bcryptjs (Password Hashing)
- JSON Web Token (JWT)
- Multer (File Upload)
- dotenv (Environment Variables)
- Nodemon (Development)

### Database

- MongoDB
- Mongoose (ODM)

---

## 🔐 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization
- Protected API routes using middleware
- Environment variable configuration for secure credentials

---

## 📂 Project Structure
LearnHub/
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx
│
└── backend/
├── config/
├── models/
├── routes/
├── middleware/
├── index.js
└── .env


---

## 🗄 Database Design

### Users Collection

- _id
- name
- email
- password (hashed)
- type (student / teacher / admin)

### Courses Collection

- _id
- userID (Teacher reference)
- C_educator
- C_categories
- C_title
- C_description
- sections
- C_price
- enrolled

### Relationships

- One Teacher → Many Courses
- One Student → Many Enrollments

---

## ⚙ Installation & Setup Guide

### 1️⃣ Clone the Repository
git clone <repository_link>

### 2️⃣ Navigate to Project Director
cd LearnHub

### 3️⃣ Install Backend Dependencies
cd backend
npm install

### 4️⃣ Install Frontend Dependencies
cd ../frontend
npm install

### 5️⃣ Configure Environment Variables
Create a `.env` file in the backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### 6️⃣ Start Development Server
Backend: npm start
Frontend: npm run dev
Application runs at: http://localhost:5172


---

## 🔄 Application Flow

1. User registers (Student/Teacher/Admin)
2. Password is encrypted using bcrypt
3. JWT token generated upon login
4. Protected routes verified using middleware
5. Student browses and enrolls in courses
6. Teacher manages course content
7. Admin monitors entire system
8. Student completes course
9. Certificate generated and downloadable

---

## 🎯 Project Objective

The objective of LearnHub is to create a scalable, secure, and efficient online learning system that supports digital education and skill enhancement using modern web technologies.

---

## 🚀 Future Enhancements

- AI-based course recommendation system
- Payment gateway integration
- Live video streaming support
- Advanced analytics dashboard
- Mobile application support
- Gamification and achievement badges

---

## 📌 Academic Context

This project was developed as part of an internship under APSCHE to demonstrate full-stack web development skills, secure authentication mechanisms, and real-world application architecture using modern technologies.
