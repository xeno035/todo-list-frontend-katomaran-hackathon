import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import toast from 'react-hot-toast';
import { Star, Zap } from 'lucide-react';

const VitalTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVitalTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      // Filter for high priority and overdue tasks
      const vitalTasks = response.data.filter(task => 
        task.priority === 'high' || 
        (new Date(task.dueDate) < new Date() && task.status !== 'completed')
      );
      setTasks(vitalTasks);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch vital tasks');
      console.error('Error fetching vital tasks:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitalTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      toast.success('Task deleted successfully');
      fetchVitalTasks();
    } catch (error) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-danger to-danger/80 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10 flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Vital Tasks</h1>
            <p className="text-white/90 text-lg">High priority and overdue tasks that need immediate attention</p>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20">
        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-12 h-12 text-success/50" />
            </div>
            <h3 className="text-2xl font-semibold text-text mb-4">Great job!</h3>
            <p className="text-muted text-lg max-w-md mx-auto">
              You have no vital tasks at the moment. All your high priority and overdue tasks are under control.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-text flex items-center">
                <Star className="w-6 h-6 mr-3 text-danger" />
                Urgent Attention Required ({tasks.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TaskCard task={task} onDelete={handleDeleteTask} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VitalTasks;