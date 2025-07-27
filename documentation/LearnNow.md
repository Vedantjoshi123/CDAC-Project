Project Title & Description

## LearnNow (E-Learning Management System)
-A full-stack web application that allows students to access courses, manage content, and track progress. Built using React.js (frontend), Spring Boot (backend), and MySQL (database).


## Tech Stack

Frontend: React.js, Axios,Tailwind CSS
Backend: Spring Boot (Java), Spring MVC, Spring Data JPA
Database: MySQL
Others: Postman, Git, REST APIs, JWT (for auth)


## System Requirements

-Node.js v18+
-Java JDK 17+
-MySQL Server
-Maven
-Git

## Project Setup

# Backend (Spring Boot):
Configure application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/learnnowdb
spring.datasource.username=root
spring.datasource.password=yourpassword

-run spring boot app 

# Frontend (React):
cd frontend
npm install
npm run dev


## Project Structure

# Frontend (React):
frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── services/
  │   └── App.jsx


# Backend (Spring Boot):
backend/
  ├── src/main/java/com/project/
  │   ├── controller/
  │   ├── service/
  │   ├── model/
  │   ├── repository/
  │   └── LearnNowApplication.java


## 📚 Features

- User Authentication (Login/Register)
- Role-based access: Admin, Teacher, Student
- Course management (add/edit/update/delete courses)
- Video embedding (YouTube)
<>---  Assignment upload/download  ----<>
- Progress tracking
- Testimonials and feedbacks and reviews
- REST APIs with validation


## 🔐 Authentication & Security

- JWT-based authentication
- Role-based access using Spring Security
- Passwords encrypted with BCrypt


##  Testing

- API testing with Postman
- Form validation in React
- Unit and integration testing using JUnit, Mockito


## UI Preview

- Login/Register
- Dashboard
- Course Listing
- Video Embedding
- Admin 

## Troubleshooting / FAQs
- Port conflicts? -> Change port in application.properties or package.json
- DB connection error? -> Check MySQL status and credentials
- JWT expired? -> Re-login

## Future Enhancements

- Live classes integration
- Certificate generation
- Email notifications

## Contributors

# vedant Joshi 
-
-
-
-
# Tushar chavan
-
-
-
-
# Abhishek athare
-
-
-
-
# Gaurav Aware
-
-
-
-