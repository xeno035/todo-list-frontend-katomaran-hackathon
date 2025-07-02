import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import toast from 'react-hot-toast';

const InviteCollaborator = () => {
  const [tasks, setTasks] = useState([]);
  const [inviteTaskId, setInviteTaskId] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskAPI.getTasks();
        setTasks(Array.isArray(response.data) ? response.data : response.data.tasks || []);
      } catch (err) {
        toast.error('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleInvite = async (taskId) => {
    setInviting(true);
    try {
      await taskAPI.shareTask(taskId, inviteEmail);
      toast.success(`Task invited to ${inviteEmail}`);
      setInviteTaskId(null);
      setInviteEmail('');
    } catch (err) {
      // Show backend error message if available
      const msg = err?.response?.data?.message || 'Failed to invite collaborator';
      toast.error(msg);
    } finally {
      setInviting(false);
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
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20 mb-8">
        <h1 className="text-4xl font-bold text-text mb-2">Invite Collaborator</h1>
        <p className="text-muted text-lg">Invite others to collaborate on your tasks by email.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="relative">
            <TaskCard task={task} onDelete={() => {}} />
            <div className="flex justify-end mt-2">
              {inviteTaskId === task._id ? (
                <div className="flex flex-col space-y-2 w-full">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder="Enter collaborator's email"
                    className="px-3 py-2 border rounded-lg w-full"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleInvite(task._id)}
                      disabled={inviting || !inviteEmail}
                      className="px-3 py-1 bg-success text-white rounded-lg hover:bg-success/90 transition-all duration-200"
                    >
                      {inviting ? 'Inviting...' : 'Invite'}
                    </button>
                    <button
                      onClick={() => { setInviteTaskId(null); setInviteEmail(''); }}
                      className="px-3 py-1 bg-gray-200 text-muted rounded-lg hover:bg-gray-300 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setInviteTaskId(task._id)}
                  className="px-3 py-1 text-xs bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200"
                >
                  Invite
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InviteCollaborator; 