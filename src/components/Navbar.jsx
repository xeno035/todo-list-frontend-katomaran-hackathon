import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-muted/20 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-background/50 rounded-lg px-4 py-2 transition-all duration-200 hover:bg-background/80">
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full border-2 border-primary/20 transition-transform duration-200 hover:scale-110"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-text font-medium text-sm">
                {user.displayName || user.email}
              </span>
              <p className="text-muted text-xs">Online</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;