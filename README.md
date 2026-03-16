# HACK-O-PHOBIA 🚀

A premium full-stack university hackathon management system built with modern web technologies.

## 🛠️ Technology Stack

- **Frontend:** React, Vite, Tailwind CSS, Bootstrap, Framer Motion, Lucide Icons, Axios.
- **Backend:** Node.js, Express, MongoDB, Mongoose.
- **Design:** Glassmorphism, Premium Dark UI, Rich Animations.

## 🚀 Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB installed locally or a MongoDB Atlas URI.

### 1. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (already created) and set your `MONGO_URI`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hackophobia
```

Start the server:
```bash
npm run dev
```

### 2. Setup Frontend

```bash
# In the root directory
npm install
npm run dev
```

The application should now be running at `http://localhost:5173`.

## ✨ Features

- **Premium Landing Page:** Animated hero section and features.
- **Team Registration:** Bootstrap-powered modal for registering teams.
- **Real-time Dashboard:** Track hackathon stats and recent activities.
- **Database Driven:** Teams are saved to and fetched from MongoDB.

## 📁 Project Structure

- `/src`: Frontend React components and pages.
- `/src/pages`: Individual application screens (Dashboard, Teams, etc.).
- `/server`: Node.js/Express backend.
- `/server/models`: Mongoose database schemas.
- `/server/routes`: API endpoints.
