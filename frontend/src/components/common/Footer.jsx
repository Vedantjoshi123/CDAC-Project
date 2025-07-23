import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-bg)] text-[var(--color-text-secondary)] py-6 px-4 text-center mt-10 border-t border-gray-600/20">
      <p className="text-sm">&copy; {new Date().getFullYear()} LearnNow. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
