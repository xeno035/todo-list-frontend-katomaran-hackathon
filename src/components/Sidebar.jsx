import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, Star, FolderOpen, Plus, Check, UserPlus, Users } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, path: '/dashboard', label: 'Dashboard' },
    { icon: CheckSquare, path: '/tasks', label: 'My Tasks' },
    { icon: FolderOpen, path: '/categories', label: 'Categories' },
    { icon: UserPlus, path: '/invite-collaborator', label: 'Invite Collaborator' },
    { icon: Users, path: '/shared-tasks', label: 'Shared Tasks' },
    { icon: Plus, path: '/add-task', label: 'Add Task' },
  ];

  return (
    <aside className="bg-primary w-16 min-h-screen flex flex-col py-6 shadow-lg">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg">
          <Check className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex justify-center py-3 mx-2 rounded-xl transition-all duration-300 group relative transform hover:scale-110 ${
                    isActive
                      ? 'bg-accent text-white shadow-lg scale-110'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5" />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 px-3 py-2 bg-text text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 transform translate-x-2 group-hover:translate-x-0">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-text"></div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom decoration */}
      <div className="flex justify-center">
        <div className="w-8 h-1 bg-accent/30 rounded-full"></div>
      </div>
    </aside>
  );
};

export default Sidebar;