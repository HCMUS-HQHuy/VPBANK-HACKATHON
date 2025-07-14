import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const RegisterPage = () => {
  return (
    // Main container to center the card on the page
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      
      {/* 
        The main card using your custom .glass-card utility.
        It's responsive, taking the full width on small screens and a max-width on larger ones.
      */}
      <div className="glass-card w-full max-w-md rounded-2xl p-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-brand-primary-light rounded-full mb-4">
            <FontAwesomeIcon icon={faLayerGroup} className="text-brand-primary text-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-text-primary">Create Your Account</h2>
          <p className="text-text-secondary mt-2">Start your journey to financial freedom.</p>
        </div>

        {/* Registration Form */}
        <form className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-text-secondary">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Alex Doe"
              className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-text-secondary">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-text-secondary">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

           {/* Confirm Password Field */}
           <div>
            <label htmlFor="confirm-password" className="text-sm font-medium text-text-secondary">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-brand-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-primary/20"
            >
              Register
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-text-secondary mt-8">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-text-accent hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;