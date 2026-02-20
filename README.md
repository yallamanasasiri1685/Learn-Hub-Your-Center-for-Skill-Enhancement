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

