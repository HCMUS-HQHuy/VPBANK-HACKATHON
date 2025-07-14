import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-text-primary">404</h1>
      <p className="text-xl text-text-secondary mt-4">Page Not Found</p>
      <p className="text-text-secondary mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="mt-8 inline-block px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;