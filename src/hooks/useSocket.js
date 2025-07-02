import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const SOCKET_URL = 'https://todo-list-backend-katomaran-hackathon-1.onrender.com'; // Backend URL for production

export const useSocket = (onTaskUpdate, onTaskShared) => {
  const socketRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && !socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        auth: {
          token: user.accessToken,
        },
      });

      // Join the room for this user's email
      if (user.email) {
        socketRef.current.emit('join', user.email.toLowerCase());
      }

      if (onTaskUpdate) {
        socketRef.current.on('taskUpdated', onTaskUpdate);
        socketRef.current.on('taskCreated', onTaskUpdate);
        socketRef.current.on('taskDeleted', onTaskUpdate);
      }

      // Listen for real-time shared tasks
      if (onTaskShared) {
        socketRef.current.on('task-shared', onTaskShared);
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user, onTaskUpdate, onTaskShared]);

  return socketRef.current;
};