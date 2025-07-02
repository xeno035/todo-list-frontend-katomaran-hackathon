import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Save, ArrowLeft, Calendar, FileText, Flag, Clock } from 'lucide-react';

const AddTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    if (!formData.dueDate) {
      toast.error('Please select a due date');
      return;
    }

    setLoading(true);
    try {
      await taskAPI.createTask(formData);
      toast.success('Task created successfully!');
      navigate('/tasks');
    } catch (error) {
      toast.error('Failed to create task');
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 text-muted" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-text mb-2">Create New Task</h1>
            <p className="text-muted text-lg">Add a new task to your workflow</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center text-text font-medium text-lg">
              <FileText className="w-5 h-5 mr-2 text-accent" />
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center text-text font-medium text-lg">
              <FileText className="w-5 h-5 mr-2 text-accent" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your task..."
              rows={4}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-none bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Due Date and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div className="space-y-2">
              <label className="flex items-center text-text font-medium text-lg">
                <Calendar className="w-5 h-5 mr-2 text-accent" />
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                required
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="flex items-center text-text font-medium text-lg">
                <Flag className="w-5 h-5 mr-2 text-accent" />
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent appearance-none transition-all duration-200 bg-gray-50 focus:bg-white"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="flex items-center text-text font-medium text-lg">
              <Clock className="w-5 h-5 mr-2 text-accent" />
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent appearance-none transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-muted/10">
            <button
              type="button"
              onClick={handleBack}
              className="px-8 py-4 border border-gray-200 text-muted rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Create Task</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;