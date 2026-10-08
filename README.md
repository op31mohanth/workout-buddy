# Workout Buddy

A workout tracker with a React frontend, an Express API, and MongoDB.

## Requirements

- Node.js and npm
- MongoDB running locally, or a MongoDB connection URI

## Setup

1. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create `backend/.env` using `backend/.env.example` as a template, and set
   `MONGO_URI` to your MongoDB connection string. Keep `.env` private; it is
   excluded from Git.

3. Start the API from the `backend` directory:

   ```bash
   node server.js
   ```

4. In a separate terminal, install and start the frontend:

   ```bash
   cd frontend
   npm install
   npm start
   ```

The frontend runs at <http://localhost:3000> and the API runs on port 5000.

## GitHub

This repository contains the project source. The `.env` file and generated
dependency/build folders are excluded; configure your own MongoDB URI locally.
Pushing the source to GitHub does not host or run the app.
