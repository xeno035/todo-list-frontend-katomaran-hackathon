import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import Categories from './pages/Categories';
import Layout from './components/Layout';
import InviteCollaborator from './pages/InviteCollaborator';
import SharedTasks from './pages/SharedTasks';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/add-task" element={<AddTask />} />
                        <Route path="/edit-task/:id" element={<EditTask />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/invite-collaborator" element={<InviteCollaborator />} />
                        <Route path="/shared-tasks" element={<SharedTasks />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#fff',
                  color: '#22223B',
                  border: '1px solid #F9A826',
                },
                success: {
                  iconTheme: {
                    primary: '#4BB543',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#E63946',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;