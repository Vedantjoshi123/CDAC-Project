import React, { useContext, useState } from 'react'
import {assets} from '../../assets/assets'
import {Link} from 'react-router-dom'
import {useClerk, UserButton, useUser} from "@clerk/clerk-react"
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { AppContext } from '../../context/AppContext'
import LoginBtn from '../../pages/student/LoginBtn';


const Navbar = () => {

  const {navigate, isTeacher} = useContext(AppContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCourseListPage = location.pathname.includes("/course-list");

  const {openSignIn} = useClerk()
  const {user} = useUser()

  return (
<div className={`py-4 px-4 sm:px-10 md:px-14 lg:px-36 
  flex items-center justify-between bg-[var(--color-bg)] ' 
`}>


      {/* Logo */}
        <Link to="/">
      <img src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer' />
      </Link>
      {/* Hamburger Button - mobile only */}
      <button
        className='md:hidden'
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Menu */}
      <div className='hidden md:flex items-center gap-5 text-[var(--color-text-secondary)]'>
        <div className='flex items-center gap-5'>
          {user && (
           <>
              <Link to='/teacher' className="text-[var(--color-text)]">
                {isTeacher ? 'Teacher Dashboard' : 'Become Teacher'}
              </Link>
              <span className="text-[var(--color-text)]"> | </span>
              <Link to='/my-enrollments' className="text-[var(--color-text)]">
                My Enrollments
              </Link>
            </>

          )}
        </div>
        <ThemeToggle />
        {user ? (
          <UserButton />    // user already logged in 
        ) : (
          <button className='bg-[var(--color-primary)] text-white px-5 py-2 rounded-full'>
              <LoginBtn />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
      <div className={`absolute top-18 left-0 w-full z-50 px-4 py-4 flex flex-col gap-3 text-[var(--color-text-secondary)] md:hidden 
  ${isCourseListPage ? 'bg-[var(--color-bg)]' : 'bg-cyan-100/70'}`}>
          {user && (
            <div className='flex flex-col gap-2 text-sm'>
              <Link to='/teacher'>{isTeacher ? 'Teacher Dashboard' : 'Become Teacher'}</Link>
              <Link to='/my-enrollments' onClick={() => setMobileMenuOpen(false)}>My Enrollments</Link>
            </div>
          )}

          <div className='flex items-center justify-between'>
            <ThemeToggle />
            {user ? (
              <UserButton />   // user already logged in 
            ) : (
              <button onClick={() => { setMobileMenuOpen(false); openSignIn(); }}>
                <img src={assets.user_icon} alt="User Icon" className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar
