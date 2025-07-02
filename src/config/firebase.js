import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNqkA3x0_XZ9y1E6Ce7sVtu8W7EnGjLc8",
  authDomain: "todo-list-8383f.firebaseapp.com",
  projectId: "todo-list-8383f",
  storageBucket: "todo-list-8383f.appspot.com",
  messagingSenderId: "971803049035",
  appId: "1:971803049035:web:9d1b9b3c46ee2d304321ce",
  measurementId: "G-PGH6FVT2LQ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;