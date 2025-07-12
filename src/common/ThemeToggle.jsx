import React from 'react';
import { useTheme } from './ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const options = [
    { name: 'light', icon: faSun },
    { name: 'dark', icon: faMoon },
    { name: 'system', icon: faDesktop },
  ];

  return (
    <div className="flex items-center p-1 rounded-full">
      {options.map((option) => (
        <button
          key={option.name}
          onClick={() => setTheme(option.name)}
          className={`flex items-center justify-center w-8 h-8 rounded-full capitalize text-sm transition-colors ${
            theme === option.name
              ? 'bg-background text-primary shadow'
              : 'text-text-secondary hover:bg-border'
          }`}
          aria-label={`Switch to ${option.name} mode`}
        >
          <FontAwesomeIcon icon={option.icon} />
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;