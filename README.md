# Todo List Frontend

This is the frontend for the Todo List application, built with React and Tailwind CSS.

## Features
- User authentication (Firebase Auth)
- Task management UI
- Task sharing and collaboration
- Real-time updates with Socket.IO

## Prerequisites
- Node.js (v16+ recommended)
- Firebase project (for web config)

## Setup

1. **Clone the repository:**
   ```sh
   git clone <your-frontend-repo-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure Firebase:**
   - In `src/config/firebase.js`, update the `firebaseConfig` object with your Firebase project's web config (from the Firebase Console > Project Settings > General > Your apps).

4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Deployment
- Deploy to Vercel, Netlify, or any static hosting provider.
- Set up environment variables as needed for your API base URL.

## License
MIT



“This project is a part of a hackathon run by
https://www.katomaran.com
