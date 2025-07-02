import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useSocket } from '../hooks/useSocket';
import TaskCard from '../components/TaskCard';
import toast from 'react-hot-toast';
import { CheckSquare, Clock, AlertCircle, TrendingUp, Calendar, Star, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(true);

  const socket = useSocket((updatedTask) => {
    fetchTasks();
    fetchStats();
  });

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(Array.isArray(response.data.tasks) ? response.data.tasks.slice(0, 6) : []); // Show only recent 6 tasks
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await taskAPI.getTaskStats();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to fetch statistics');
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchTasks(), fetchStats()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      toast.success('Task deleted successfully');
      fetchTasks();
      fetchStats();
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

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: CheckSquare,
      color: 'bg-gradient-to-r from-accent to-accent/80',
      textColor: 'text-white',
      bgPattern: 'bg-accent/10'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-success to-success/80',
      textColor: 'text-white',
      bgPattern: 'bg-success/10'
    },
    {
      title: 'In Progress',
      value: stats.pending,
      icon: Clock,
      color: 'bg-gradient-to-r from-primary to-primary/80',
      textColor: 'text-white',
      bgPattern: 'bg-primary/10'
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      color: 'bg-gradient-to-r from-danger to-danger/80',
      textColor: 'text-white',
      bgPattern: 'bg-danger/10'
    }
  ];

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-text mb-3 flex items-center space-x-3">
            <span>Welcome back!</span>
            <Star className="w-8 h-8 text-accent animate-pulse" />
          </h1>
          <p className="text-muted text-lg">Here's what's happening with your tasks today.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`${stat.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up transform hover:scale-105 relative overflow-hidden`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 ${stat.bgPattern} opacity-20`}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${stat.textColor} opacity-90 text-sm font-medium mb-1`}>
                      {stat.title}
                    </p>
                    <p className={`${stat.textColor} text-3xl font-bold`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3">
                    <Icon className={`${stat.textColor} w-6 h-6`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20">
        <h2 className="text-2xl font-semibold text-text mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-3 text-accent" />
          Progress Overview
        </h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center text-sm text-muted mb-3">
              <span className="font-medium">Task Completion Rate</span>
              <span className="text-2xl font-bold text-text">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-success to-success/80 h-3 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${completionRate}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-muted/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{stats.completed}</p>
              <p className="text-sm text-muted">Done</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{stats.pending}</p>
              <p className="text-sm text-muted">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-danger">{stats.overdue}</p>
              <p className="text-sm text-muted">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-text flex items-center">
            <Star className="w-6 h-6 mr-3 text-accent" />
            Recent Tasks
          </h2>
          {tasks.length > 0 && (
            <a
              href="/tasks"
              className="text-accent hover:text-accent/80 text-sm font-medium transition-colors hover:underline"
            >
              View all tasks →
            </a>
          )}
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckSquare className="w-12 h-12 text-accent/50" />
            </div>
            <h3 className="text-xl font-medium text-text mb-3">No tasks yet</h3>
            <p className="text-muted mb-8 max-w-md mx-auto">
              Create your first task to get started on your productivity journey!
            </p>
            <a
              href="/add-task"
              className="bg-accent text-white px-8 py-3 rounded-xl hover:bg-accent/90 transition-all duration-200 inline-flex items-center font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <CheckSquare className="w-5 h-5 mr-2" />
              Create Your First Task
            </a>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;