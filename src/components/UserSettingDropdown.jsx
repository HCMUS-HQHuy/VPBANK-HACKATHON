import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext'; 

const UserSettingsDropdown = ({ closeDropdown }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeDropdown(); 
    navigate('/login'); 
  };

  return (
    <div
      className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg z-50 p-2 flex flex-col"
    >
      {user && (
        <div className="flex items-center gap-3 p-2 mb-1 border-b border-border">
          <img className="h-10 w-10 rounded-full flex-shrink-0" src={`https://i.pravatar.cc/40?u=${user.username}`} alt="User avatar" />
          <div className="min-w-0">
            <p className="font-semibold text-text-primary truncate">{user.username}</p>
            <p className="text-sm text-text-secondary truncate">{user.email}</p>
          </div>
        </div>
      )}

      <div className="flex-grow">
        <Link to="/profile" onClick={closeDropdown} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-text-primary rounded-md hover:bg-card-secondary">
          <FontAwesomeIcon icon={faUser} className="w-4" />
          <span>Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-danger rounded-md hover:bg-card-secondary text-left"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="w-4" />
          <span>Log Out</span>
        </button>
      </div>

      <div className="p-2 mt-1 border-t border-border">
        <p className="text-xs font-semibold text-text-secondary mb-2">Theme</p>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default UserSettingsDropdown;