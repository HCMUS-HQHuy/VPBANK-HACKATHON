import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  return (
    <div className="glass-card w-full max-w-md rounded-2xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-brand-primary-light rounded-full mb-4">
          <FontAwesomeIcon icon={faLayerGroup} className="text-brand-primary text-3xl" />
        </div>
        <h2 className="text-3xl font-bold text-text-primary">Welcome Back</h2>
        <p className="text-text-secondary mt-2">Log in to continue to FinCoach.</p>
      </div>

      {/* Login Form */}
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email address</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-text-secondary">Password</label>
          <input id="password" name="password" type="password" required placeholder="••••••••" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <button type="submit" className="w-full py-3 bg-brand-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-primary/20">
            Log In
          </button>
        </div>
      </form>

      {/* Footer Link */}
      <p className="text-center text-sm text-text-secondary mt-8">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-text-accent hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;