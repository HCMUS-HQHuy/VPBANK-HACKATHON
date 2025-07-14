import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;