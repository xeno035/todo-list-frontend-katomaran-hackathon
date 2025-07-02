import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const FloatingActionButton = () => {
  return (
    <Link
      to="/add-task"
      className="fixed bottom-6 right-6 bg-accent text-white w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110 animate-bounce-gentle z-50 group"
    >
      <Plus className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" />
      <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20"></div>
    </Link>
  );
};

export default FloatingActionButton;