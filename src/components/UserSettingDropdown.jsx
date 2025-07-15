import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from '@/components/ThemeToggle';

const UserSettingsDropdown = forwardRef(({ onClose }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg z-50 p-2 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Phần thông tin người dùng */}
      <div className="flex items-center gap-3 p-2 mb-1 border-b border-border">
        <img className="h-10 w-10 rounded-full flex-shrink-0" src="https://i.pravatar.cc/40?u=alex" alt="User avatar" />
        {/* SỬA LỖI 1: Thêm min-w-0 để truncate hoạt động trong flexbox */}
        <div className="min-w-0">
          {/* SỬA LỖI 1: Thêm class 'truncate' */}
          <p className="font-semibold text-text-primary truncate">Alex Turner With A Very Long Name</p>
          <p className="text-sm text-text-secondary truncate">alex.turner.with.a.very.long.email@example.com</p>
        </div>
      </div>

      {/* Phần Menu Links */}
      <div className="flex-grow">
        <Link to="/profile" onClick={onClose} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-text-primary rounded-md hover:bg-card-secondary">
          <FontAwesomeIcon icon={faUser} className="w-4" />
          <span>Profile</span>
        </Link>
        <Link to="/settings" onClick={onClose} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-text-primary rounded-md hover:bg-card-secondary">
          <FontAwesomeIcon icon={faCog} className="w-4" />
          <span>Settings</span>
        </Link>
        <button onClick={onClose} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-danger rounded-md hover:bg-card-secondary">
          <FontAwesomeIcon icon={faSignOutAlt} className="w-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* SỬA LỖI 2: Di chuyển ThemeToggle xuống đây */}
      <div className="p-2 mt-1 border-t border-border">
        <p className="text-xs font-semibold text-text-secondary mb-2">Theme</p>
        <ThemeToggle />
      </div>
    </div>
  );
});

export default UserSettingsDropdown;