# FitTrack

## Introduction
FitTrack is a dynamic fitness tracking backend application developed for the Masai Hackathon. The project is designed to efficiently manage and track fitness data while providing essential services such as secure user authentication, real-time updates via Socket.io, scheduled tasks using node-cron, and seamless file uploads with Multer. By integrating modern tools like Express.js, MongoDB, and Cloudinary, FitTrack addresses common challenges in fitness data management and offers a scalable foundation for both current and future fitness applications.

## Project Type
         Fullstack

## Deplolyed App
* Frontend: Natlify

* Backend: Render

* Database: MongoBD

## Video Walkthrough of the project
Attach a very short video walkthough of all of the features [ 1 - 3 minutes ]

## Video Walkthrough of the codebase
Attach a very short video walkthough of codebase [ 1 - 5 minutes ]



## Features
- **Secure Authentication:** Implements JWT-based user authentication combined with OTP verification for enhanced security.
- **Workout Management:** Enables users to log, track, and manage their workout routines effectively.
- **Real-time Messaging:** Facilitates live communication features within the application.
- **Profile Image Handling:** Supports file uploads and image management using Multer and Cloudinary.
- **Scheduled Tasks:** Utilizes node-cron to automate periodic tasks such as notifications and data maintenance.


## Installation & Getting started


```bash
cd Backend
npm i
npm start
```
## Set Up Environment Variables:
##### PORT=3000
#####  MONGODB_URI=your-mongodb-connection-string
#####  CLOUDINARY_API_KEY=your-cloudinary-api-key
#####  CLOUDINARY_API_SECRET=your-cloudinary-api-secret
##### JWT_SECRET=your-jwt-secret


## API Endpoints

### OTP Endpoints
- **POST** `/verify-otp`  
  Verifies an OTP code provided by the user.

### Profile Image Endpoints
- **POST** `/upload`  
  Uploads and updates the user's profile photo.  
  _Requires authentication and accepts a file field named `profilePhoto`._

### User Endpoints
- **POST** `/register`  
  Registers a new user.
  
- **POST** `/login`  
  Logs in a user and returns an authentication token.
  
- **GET** `/profile_info`  
  Retrieves the authenticated user's profile information.  
  _Requires authentication._
  
- **PATCH** `/update_profile`  
  Updates the profile information of an authenticated user.  
  _Requires authentication._
  
- **POST** `/forgot_password`  
  Sends a password reset email to the user.
  
- **GET** `/reset_password/:token`  
  Displays the password reset page or validates the reset token.
  
- **POST** `/reset_password/:token`  
  Submits a new password for the reset process.

### Workout Endpoints
- **POST** `/create`  
  Creates a new workout entry.  
  _Requires authentication._
  
- **GET** `/get`  
  Retrieves workout details for the authenticated user.  
  _Requires authentication._
  
- **PUT** `/update/:id`  
  Updates an existing workout based on its ID.
  
- **GET** `/incomplete`  
  Retrieves a list of incomplete workouts for the authenticated user.  
  _Requires authentication._


## Technology Stack

- **Node.js:** A JavaScript runtime environment that allows execution of server-side code, forming the backbone of the application.
- **Express.js:** A fast and minimal web framework for Node.js, used for building RESTful APIs, handling routing, and managing middleware.
- **MongoDB:** A NoSQL database that stores data in a flexible, JSON-like format, ideal for managing user profiles, workouts, and messaging data.
- **Other Libraries/Modules:**
  - **Mongoose:** An Object Data Modeling (ODM) library for MongoDB that simplifies data validation and schema management.
  - **Socket.io:** Enables real-time, bidirectional communication between the client and server.
  - **JSON Web Tokens (JWT):** Implements secure user authentication and session management.
  - **Multer:** Middleware for handling file uploads, specifically used for profile photo management.
  - **dotenv:** Loads environment variables from a `.env` file, ensuring sensitive information is kept secure.
  - **node-cron:** Allows scheduling of periodic tasks like notifications and maintenance jobs.
  - **Cloudinary:** Manages and stores media assets such as images and videos.
  - **Nodemailer:** Facilitates the sending of emails, e.g., for password reset notifications.
  - **Argon2:** A secure password hashing library to enhance user security.

### Thank you :)