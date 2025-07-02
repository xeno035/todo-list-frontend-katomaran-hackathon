import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Save, ArrowLeft, Calendar, FileText, Flag, CheckSquare } from 'lucide-react';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await taskAPI.getTaskById(id);
      const foundTask = response.data;
      setTask({
        title: foundTask.title,
        description: foundTask.description,
        dueDate: foundTask.dueDate ? foundTask.dueDate.split('T')[0] : '',
        priority: foundTask.priority,
        status: foundTask.status
      });
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch task');
      console.error('Error fetching task:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await taskAPI.updateTask(id, task);
      toast.success('Task updated successfully!');
      navigate('/tasks');
    } catch (error) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
        console.error('Server status:', error.response.status);
        console.error('Server headers:', error.response.headers);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
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
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/tasks')}
            className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 text-muted" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-text mb-2">Edit Task</h1>
            <p className="text-muted text-lg">Update your task details</p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-text space-x-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>Task Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Enter task title..."
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-text space-x-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>Description</span>
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
              placeholder="Describe your task..."
            />
          </div>

          {/* Due Date and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-text space-x-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span>Due Date</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-text space-x-2">
                <Flag className="w-4 h-4 text-accent" />
                <span>Priority</span>
              </label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent appearance-none transition-all duration-200 bg-gray-50 focus:bg-white"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-text space-x-2">
              <CheckSquare className="w-4 h-4 text-accent" />
              <span>Status</span>
            </label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent appearance-none transition-all duration-200 bg-gray-50 focus:bg-white"
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
              onClick={() => navigate('/tasks')}
              className="px-8 py-3 border border-gray-200 text-muted rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-accent text-white px-8 py-3 rounded-xl hover:bg-accent/90 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Update Task</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;