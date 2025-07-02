import React, { useState } from 'react';
import { Edit, Trash2, Calendar, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';

const TaskCard = ({ task, onDelete }) => {
  const [showShare, setShowShare] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [sharing, setSharing] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 border-success text-success';
      case 'in-progress':
        return 'bg-accent/10 border-accent text-accent';
      default:
        return 'bg-danger/10 border-danger text-danger';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') {
      return <AlertCircle className="w-4 h-4 text-danger" />;
    }
    return null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const handleShare = async () => {
    setSharing(true);
    try {
      await taskAPI.shareTask(task._id, shareEmail);
      toast.success(`Task shared with ${shareEmail}`);
      setShowShare(false);
      setShareEmail('');
    } catch (err) {
      toast.error('Failed to share task');
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 animate-slide-up group hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2 flex-1">
          <h3 className="font-semibold text-text truncate group-hover:text-primary transition-colors duration-200">
            {task.title}
          </h3>
          {getPriorityIcon(task.priority)}
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            to={`/edit-task/${task._id}`}
            className="p-2 text-muted hover:text-primary transition-all duration-200 rounded-lg hover:bg-primary/10 transform hover:scale-110"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-muted hover:text-danger transition-all duration-200 rounded-lg hover:bg-danger/10 transform hover:scale-110"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-muted text-sm mb-4 line-clamp-2 leading-relaxed">
        {task.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(task.status)}`}
          >
            {getStatusIcon(task.status)}
            <span>{task.status.replace('-', ' ')}</span>
          </span>
        </div>
        
        <div className={`flex items-center text-xs ${isOverdue ? 'text-danger' : 'text-muted'}`}>
          <Calendar className="w-3 h-3 mr-1" />
          {formatDate(task.dueDate)}
          {isOverdue && <span className="ml-1 font-medium">Overdue</span>}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <div 
          className={`h-1 rounded-full transition-all duration-500 ${
            task.status === 'completed' ? 'bg-success w-full' : 
            task.status === 'in-progress' ? 'bg-accent w-2/3' : 
            'bg-danger w-1/3'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default TaskCard;