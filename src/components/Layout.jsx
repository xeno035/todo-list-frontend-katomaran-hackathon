import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-1">
        {/* Fixed sidebar */}
        <div className="fixed top-0 left-0 h-full w-64 z-30">
          <Sidebar />
        </div>
        {/* Main content with left margin to accommodate sidebar */}
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-5xl mx-auto w-full ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 