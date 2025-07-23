import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center">

      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-[var(--color-text)] max-w-3xl mx-auto">
        Empower your future with the courses designed to{" "}
        <span className="text-[var(--color-primary)]">fit your choice.</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>

      <p className="md:block hidden text-[var(--color-text)] max-w-2xl mx-auto">
        We bring together world class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
      </p>

      <p className="md:hidden text-[var(--color-text-secondary)] max-w-sm mx-auto">
        We bring together world-class instructors to help you achieve your personal and professional goals.
      </p>

      <SearchBar />
    </div>
  )
}

export default Hero
