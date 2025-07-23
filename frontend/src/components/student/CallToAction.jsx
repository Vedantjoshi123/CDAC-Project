import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-[var(--color-text)] font-semibold'>
        Learn anything, anytime, anywhere
      </h1>
      
      <p className='text-[var(--color-text-secondary)] sm:text-sm text-center'>
        Learn anything anywhere according to your interest or explore and find your passion at your fingertips.
      </p>
      
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button 
          className='px-10 py-3 rounded-md bg-[var(--color-primary)] 
          hover:bg-[#005B3B] transition-colors duration-300'
        >
          Get started
        </button>
        
        <button className='flex items-center gap-2 transition-colors duration-300'>
          Learn more 
          <img 
            src={assets.arrow_icon} 
            alt="arrow_icon" 
            className='w-4 h-4 filter invert'
          />
        </button>

      </div>
    </div>
  )
}

export default CallToAction
