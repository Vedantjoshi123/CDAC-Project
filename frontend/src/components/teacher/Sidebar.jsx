import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, PlusCircle, Settings, Users } from 'lucide-react';
import Feedbacks from '../../pages/teacher/Feedbacks';

const Sidebar = () => {
  const { isTeacher } = useContext(AppContext);
 const menuItems = [
  { name: 'Dashboard', path: '/teacher', icon: <Home size={24} /> },
  { name: 'Add Course', path: '/teacher/add-course', icon: <PlusCircle size={24} /> },
  { name: 'My Courses', path: '/teacher/my-courses', icon: <BookOpen size={24} /> },
  { name: 'Studens Enrolled', path: '/teacher/student-enrolled', icon: <Users size={24} /> },    
  { name: 'Feedbacks', path: '/teacher/feedbacks', icon: <Users size={24} /> },
  { name: 'Settings', path: '/teacher/settings', icon: <Settings size={24} /> },
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
            end={item.path === '/teacher'}
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

export default Sidebar;
