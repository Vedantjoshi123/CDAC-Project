import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer
      className="flex md:flex-row flex-col-reverse items-center justify-between w-full px-8 border-t"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-secondary)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-4">
        <img src={assets.logo} alt="logo" className="hidden md:block w-20" />
        <div
          className="hidden md:block h-7 w-px"
          style={{ backgroundColor: 'var(--color-border)' }}
        ></div>
        <p className="py-4 text-center text-xs md:text-sm">
          Copyright 2025. All rights Reserved.
        </p>
      </div>

      <div className="flex items-center gap-3 max-md:mt-4">
        <a href="#">
          <img src={assets.facebook_icon} alt="facebook" className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="twitter" className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="instagram" className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
