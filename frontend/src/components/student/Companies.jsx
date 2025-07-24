import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='pt-16'>
      <p className='text-3xl font-medium text-[var(--color-text)]'>
        Trusted by learners from
      </p>

      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5 pb-28'>
        <img src={assets.sunbeamLogo} alt="Microsoft" className='w-1/2 md:w-1/2' />
      </div>
    </div>
  )
}

export default Companies
