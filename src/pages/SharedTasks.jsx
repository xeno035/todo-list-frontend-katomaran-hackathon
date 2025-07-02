import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import toast from 'react-hot-toast';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../context/AuthContext';

const SharedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Fetch all tasks and filter for shared tasks
        const response = await taskAPI.getTasks();
        const allTasks = Array.isArray(response.data.tasks) ? response.data.tasks : response.data;
        const userEmail = user?.email?.toLowerCase();
        // Filter: user is a collaborator and not the creator
        const sharedTasks = allTasks.filter(
          (task) =>
            Array.isArray(task.collaborators) &&
            userEmail &&
            task.collaborators.map(e => e.toLowerCase()).includes(userEmail) &&
            (!task.createdBy || (task.createdBy !== user.uid && task.createdBy !== user.id))
        );
        setTasks(sharedTasks);
      } catch (err) {
        toast.error('Failed to fetch shared tasks');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTasks();
  }, [user]);

  // Listen for real-time shared tasks
  useSocket(null, (newTask) => {
    setTasks((prev) => {
      // Avoid duplicates
      if (prev.some((t) => t._id === newTask._id)) return prev;
      return [newTask, ...prev];
    });
    toast.success('A new task was shared with you!');
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20 mb-8">
        <h1 className="text-4xl font-bold text-text mb-2">Shared Tasks</h1>
        <p className="text-muted text-lg">Tasks shared with you by other users.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <div className="col-span-full text-center text-muted">No shared tasks found.</div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task._id} task={task} onDelete={() => {}} />
          ))
        )}
      </div>
    </div>
  );
};

export default SharedTasks;