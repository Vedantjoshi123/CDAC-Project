import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { AppContext } from '../../context/AppContext';
import LoginBtn from '../../pages/student/LoginBtn';

const Navbar = () => {
  const { navigate, isTeacher } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const handleCloseMenu = () => setMobileMenuOpen(false);

  return (
    <div className={`py-4 px-4 sm:px-10 md:px-14 lg:px-36 flex items-center justify-between bg-[var(--color-bg)]`}>
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer" />
      </Link>

      {/* Hamburger Button - Mobile only */}
      <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-5 text-[var(--color-text-secondary)]">
        {user && (
          <div className="flex items-center gap-5">
            <Link to="/teacher" className="text-[var(--color-text)]">
              {isTeacher ? 'Teacher Dashboard' : 'Become Teacher'}
            </Link>
            <span className="text-[var(--color-text)]"> | </span>
            <Link to="/my-enrollments" className="text-[var(--color-text)]">
              My Enrollments
            </Link>
          </div>
        )}
        <ThemeToggle />
        {user ? (
          <UserButton />
        ) : (
          <button className="bg-[var(--color-primary)] text-white px-5 py-2 rounded-full">
            <LoginBtn />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`absolute top-20 left-0 w-full z-50 px-4 py-4 flex flex-col gap-4 md:hidden 
          ${isCourseListPage ? 'bg-[var(--color-bg)]' : 'bg-cyan-100/70'}`}>

          {user && (
            <div className="flex flex-col gap-3 text-sm text-[var(--color-text)]">
              <Link to="/teacher" onClick={handleCloseMenu}>
                {isTeacher ? 'Teacher Dashboard' : 'Become Teacher'}
              </Link>
              <Link to="/my-enrollments" onClick={handleCloseMenu}>
                My Enrollments
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between">
            <ThemeToggle />
            {user ? (
              <UserButton />
            ) : (
              <button onClick={() => { handleCloseMenu(); openSignIn(); }}>
                <img src={assets.user_icon} alt="User Icon" className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
