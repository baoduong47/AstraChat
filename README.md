## Overview

AstraChat is a full-stack application that combines the interactive communication features of a messaging platform with an addition of the creation aspects of a blog. 

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features
- Real-time messaging functionality
- Blog posting and management
- User authentication and authorization
- User profile customization
- An addition of a couple of sampled music to play through

## Technologies
**Fontend**: React, Redux, HTML, CSS, Javascript
**Backend**: Node.js, Express.js
**Database**: MongoDB
**Other Tools**: Mongoose, JWT for authentication, Socket.IO for real-time interactions

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js
- MongoDB
- NPM or Yarn


### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AstraChat.git
   cd messaging-blog-app
2. Install backend dependencies
   ```bash
   npm install
3. Install frontend dependencies
   ```bash
   cd client
   npm install
4. Start the MongoDB service (if locally installed):
   ```bash
   mongod
5. Configure environment variables: Create a .env file in the root directory and add the following:
   ```bash
   DB_URI=mongodb://localhost:27017/yourDatabase
   JWT_SECRET=yourSecretKey
6. Run the backend server:
   ```bash
   npm run start
7. Run the frontend server:
   ```bash
   cd client
   npm start
8. Visit http://localhost:3000 in your browser to check if the application is running correctly.


### Usage
After setting up the app, you can:

- Register a new user account.
- Log in to access your messages.
- Send and receive messages in real-time.
- Upload photos directly in the chat.
- Share your location by clicking the location button in the chat interface.

