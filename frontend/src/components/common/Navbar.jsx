import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const { user, isLoggedIn, logout, login } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  // Sync context user with localStorage when component mounts or changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    } else {
      setCurrentUser(null);
    }
  }, [user, location]);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = () => {
    if (!currentUser) return null;

    switch (currentUser.userRole?.toUpperCase()) {
      case 'STUDENT':
        return <Link to="/my-enrollments">My Enrollments</Link>;
      case 'TEACHER':
        return <Link to="/teacher">Teacher Dashboard</Link>;
      case 'ADMIN':
        return <Link to="/admin">Admin Dashboard</Link>;
      default:
        return null;
    }
  };

  return (
    <div className="py-4 px-6 md:px-14 lg:px-32 flex items-center justify-between bg-[var(--color-bg)]">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer" />
      </Link>

      {/* Hamburger - Mobile */}
      <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-[var(--color-text-secondary)]">
        {navLinks()}
        <ThemeToggle />
        {currentUser ? (
          <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-full">
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-[var(--color-primary)] text-white px-5 py-2 rounded-full">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full z-50 px-4 py-4 flex flex-col gap-3 bg-[var(--color-bg)] md:hidden text-[var(--color-text-secondary)]">
          {navLinks()}
          <div className="flex justify-between items-center">
            <ThemeToggle />
            {currentUser ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <img src={assets.user_icon} alt="Login" className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
