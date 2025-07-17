import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import ThemeToggle from "@/components/ThemeToggle.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card shadow-sm border-b border-border w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <FontAwesomeIcon icon={faLayerGroup} className="text-2xl text-brand" />
                <span className="font-bold text-xl text-brand-text">FinCoach</span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="glass-card w-full max-w-md rounded-2xl p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;