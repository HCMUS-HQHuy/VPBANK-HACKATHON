import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    // This provides the centered container for the login/register forms.
    // It has NO Navbar.
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md rounded-2xl p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;