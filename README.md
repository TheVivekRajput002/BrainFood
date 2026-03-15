# FoodReel (SCS FoodPlatform)

FoodReel is a social discovery platform for food enthusiasts, featuring a short-form video feed to explore culinary content from local food partners. Users can interact by liking and saving posts, managing personal profiles, and connecting via real-time messaging.

## Features

- **Frontend**: Built with [React 19](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS v4](https://tailwindcss.com/) for a fast, modern, and responsive user interface.
- **Backend**: Powered by [Node.js](https://nodejs.org/) and [Express.js v5](https://expressjs.com/), providing a robust REST API.
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for data modeling.
- **Authentication**: Secure user authentication using [JSON Web Tokens (JWT)](https://jwt.io/) and [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing.
- **File Uploads**: Handles file uploads with [Multer](https://github.com/expressjs/multer) and [ImageKit](https://imagekit.io/) integration for media management.

## Project Structure

- `/frontend` - Contains the React application (Vite template).
- `/backend` - Contains the Node.js/Express server API.

## Prerequisites

- Node.js installed
- MongoDB instance (local or Atlas)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `backend` directory and add the necessary variables mapping to your config (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`, ImageKit credentials).

4. Start the development server:
   ```bash
   npm run dev
   # or
   npx nodemon server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Scripts

- **Frontend**:
  - `npm run dev`: Starts the Vite development server.
  - `npm run build`: Builds the app for production.
  - `npm run lint`: Runs ESLint for code formatting/linting.
  
- **Backend**:
  - `nodemon server.js`: Runs the backend in watch mode (requires nodemon).
