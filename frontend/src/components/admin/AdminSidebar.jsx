import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Users, MessageCircle, Settings, Contact } from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <Home size={24} /> },
    { name: 'All Courses', path: '/admin/courses', icon: <BookOpen size={24} /> },
    { name: 'All Teachers', path: '/admin/teachers', icon: <Users size={24} /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <MessageCircle size={24} /> },
    { name: 'Contact Us', path: '/admin/allContactUs', icon: <Contact size={24} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={24} /> },
  ];
  

  return (
    <div
      className="md:w-64 w-16 min-h-screen flex flex-col py-2 text-base"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderRight: '1px solid var(--color-border)',
        color: 'var(--color-text)',
      }}
    >
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/admin'}
          className={({ isActive }) =>
            `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 transition-all duration-200 ${
              isActive
                ? 'bg-[rgba(0,137,94,0.1)] border-r-[6px] border-[var(--color-primary)] font-semibold'
                : 'hover:bg-[rgba(0,137,94,0.05)] border-r-[6px] border-transparent hover:border-[var(--color-border)]'
            }`
          }
          style={{
            color: 'var(--color-text-secondary)',
          }}
        >
          <span className="text-[var(--color-text)]">{item.icon}</span>
          <p className="md:block hidden">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default AdminSidebar;
