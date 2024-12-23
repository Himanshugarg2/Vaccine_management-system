# Vaccine Management System

## Overview
The Vaccine Management System is a web application designed to facilitate the management of vaccination records for users, doctors, and administrators. It provides a user-friendly interface for tracking vaccinations, scheduling appointments, and managing healthcare providers. The system aims to streamline the vaccination process and enhance communication between users and healthcare professionals.

## Features
- **User Registration and Authentication**: Secure sign-up and login with JWT-based authentication.
- **Role-Based Access Control**: Different user roles (users, doctors, admins) with specific permissions.
- **Vaccine Management**: Admin can view, add, edit, and delete vaccine records doctor can mark a patient vaccien complete.
- **User-Specific Vaccine Records**: Personalized vaccine lists for each user.
- **Doctor Management**: Admins can add and manage doctors .


## Tech Stack
- **Frontend**: 
  - React.js
  - HTML5
  - CSS3
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)

## Installation

1. Clone the repository:
   git clone https://github.com/Himanshugarg2/Vaccine_management-system.git

2. Navigate to the project directory
  cd vaccine-management-system

3. Install the backend dependencies
  cd backend
  npm install

4. Install the frontend dependencies:
  cd ../my-app
  npm install

5. Set up the environment variables in a .env file in the backend directory:
  PORT=your_port
  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret

6. Start the backend server:
   cd backend
   npm start

7. Start the frontend server:
   cd ../my-app
   npm start


## Usage
Users can register and log in to view and manage their vaccination records.
Doctors can access and manage patient vaccine information.
Admins can manage users and doctors

## Future Scope
Mobile app development for better accessibility.
Integration with external health APIs for real-time vaccine information.
Enhanced user notifications for reminders and alerts.
Advanced admin dashboard for analytics and reporting.
Telemedicine features for online consultations.
Improved security measures for data protection.
