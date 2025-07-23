import React from 'react';
import { assets, dummyTeacherData } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import ThemeToggle from '../student/ThemeToggle';

const Navbar = () => {
  const teacherData = dummyTeacherData;
  const { user } = useUser();

  return (
    <div
      className="flex items-center justify-between px-4 md:px-8 py-3"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        color: 'var(--color-text-secondary)',
      }}
    >
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 lg:w-32" />
      </Link>

      {/* Right-side user info */}
      <div className="flex items-center gap-5">
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Hi! {user ? user.fullName : 'Developer'}
        </p>
            <ThemeToggle />
        {user ? (
          <UserButton />  // user already lgged in 
        ) : (
          <img
            src={assets.profile_img}
            alt="profile"
            className="w-8 h-8 object-cover rounded-full border"
            style={{ borderColor: 'var(--color-border)' }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
