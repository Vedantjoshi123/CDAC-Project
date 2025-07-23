// ThemeToggle.jsx
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
   const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });  
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
  
  return (
    <div
      onClick={() => setIsDark(prev => !prev)}
      className="p-2 rounded-full transition cursor-pointer"
      aria-label="Toggle dark/light theme"
    >
      {isDark ? <Sun size={20} className="text-[var(--color-text)]" /> : <Moon size={20} className="text-[var(--color-text)]" />}

    </div>
  );
};

export default ThemeToggle;
