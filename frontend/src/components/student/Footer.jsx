import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-[var(--color-bg)] border-t border-[var(--color-border)] text-[var(--color-text-secondary)] md:px-36 text-left w-full mt-10 transition-colors duration-300'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-[var(--color-border)]'>
        <div className='flex flex-col md:items-start items-center w-full'>
          <img 
            src={assets.logo_dark} 
            alt="logo" 
            className='dark:invert'
          />
          <p className='mt-6 text-center md:text-left text-sm'>
            We bring together world class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
          </p>
        </div>

        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-[var(--color-text)] mb-5'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm md:space-y-2'>
            <li><a href="#" className='hover:text-[var(--color-primary)] transition-colors'>Home</a></li>
            <li><a href="#" className='hover:text-[var(--color-primary)] transition-colors'>About us</a></li>
            <li><a href="#" className='hover:text-[var(--color-primary)] transition-colors'>Contact us</a></li>
            <li><a href="#" className='hover:text-[var(--color-primary)] transition-colors'>Privacy policy</a></li>
          </ul>
        </div>

        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-[var(--color-text)] mb-5'>Subscribe to our newsletter</h2>
          <p className='text-sm'>
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className='flex items-center gap-2 pt-4'>
            <input 
              type="email" 
              placeholder='Enter your email' 
              className='border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder-[var(--color-text-secondary)] outline-none w-64 h-9 rounded px-2 text-sm transition-colors duration-300' 
            />
            <button className='bg-[var(--color-primary)] hover:bg-[#005B3B] w-24 h-9 text-white rounded transition-colors duration-300 flex items-center justify-center'>
              Subscribe
            </button>

          </div>
        </div>
      </div>

      <p className='py-4 text-center text-xs md:text-sm text-[var(--color-text-secondary)]'>
        Copyright 2025. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
