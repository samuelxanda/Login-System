# User Management System

This project is a **User Management System** built with a **React frontend** and a **Node.js backend**. It includes features like user registration, login, and protected routes using JWT authentication. The backend uses MySQL as the database.

## Features

### Frontend

- Built with **React** and **Vite** for fast development.
- **React Router** for navigation and route protection.
- **TailwindCSS** for styling.
- **Axios** for API requests.
- Components for:
  - Login
  - Register
  - Home
  - Protected and Public Routes

### Backend

- Built with **Node.js** and **Express**.
- **MySQL** for database management.
- **JWT** for authentication.
- **bcrypt** for password hashing.
- RESTful APIs for:
  - User registration
  - User login
  - Fetching user data
  - Updating user data
  - Deleting user data

## Project Structure

### Frontend

frontend/ ├── src/ │ ├── components/ │ │ ├── Home.jsx │ │ ├── Login.jsx │ │ ├── Register.jsx │ │ ├── Update.jsx │ │ └── Users.jsx │ ├── routes/ │ │ ├── PrivateRoute.jsx │ │ ├── PublicRoute.jsx │ │ └── routes.jsx │ ├── App.jsx │ ├── main.jsx │ └── index.css ├── public/ ├── vite.config.js └── package.json

### Backend

backend/ ├── src/ │ ├── db/ │ │ └── users.sql │ └── server.js ├── .env └── package.json

## Setup Instructions

### Prerequisites

- Node.js installed
- MySQL database set up

### Backend Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```

Install dependencies:
npm install

Create a .env file with the following variables:
Start the backend server:
Frontend Setup
Navigate to the frontend directory:
Install dependencies:
Start the development server:
Usage
Open the frontend in your browser at http://localhost:5173.
Register a new user or log in with existing credentials.
Access protected routes after logging in.
API Endpoints
Authentication
POST /register: Register a new user.
POST /login: Log in a user.
User Management
GET /users: Get all users (protected).
GET /users/:id: Get a user by ID (protected).
PUT /users/:id: Update a user (protected).
DELETE /users/:id: Delete a user (protected).
Technologies Used
Frontend
React
React Router
TailwindCSS
Axios
Vite
Backend
Node.js
Express
MySQL
JWT
bcrypt
License
This project is licensed under the MIT License.
