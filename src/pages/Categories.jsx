import React from 'react';
import { FolderOpen, Plus } from 'lucide-react';

const Categories = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-muted/20">
        <h1 className="text-4xl font-bold text-text mb-2">Task Categories</h1>
        <p className="text-muted text-lg">Organize your tasks by categories</p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-2xl shadow-sm p-16 border border-muted/20 text-center">
        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <FolderOpen className="w-12 h-12 text-accent/50" />
        </div>
        <h3 className="text-2xl font-semibold text-text mb-4">Categories Coming Soon</h3>
        <p className="text-muted max-w-md mx-auto mb-8">
          Task categorization feature is under development. Soon you'll be able to organize your tasks into custom categories.
        </p>
        <button className="bg-accent text-white px-8 py-3 rounded-xl hover:bg-accent/90 transition-all duration-200 inline-flex items-center font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
          <Plus className="w-5 h-5 mr-2" />
          Notify Me When Ready
        </button>
      </div>
    </div>
  );
};

export default Categories;