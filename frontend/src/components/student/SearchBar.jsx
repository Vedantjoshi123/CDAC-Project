import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ data }) => {
  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : "")

  const onsearchHandler = (e) => {
    e.preventDefault()
    navigate("/course-list/" + input)
  }

  return (
    <form 
      onSubmit={onsearchHandler} 
      className='max-w-xl w-full md:h-14 h-12 flex items-center 
        rounded border transition-colors duration-300 
        border-[var(--color-border)] bg-[var(--color-bg)] dark:bg-[var(--color-bg)]'
    >
      <img 
        src={assets.search_icon} 
        alt="search_icon" 
        className='md:w-auto w-10 px-3 filter dark:invert' 
      />

      <input 
        onChange={e => setInput(e.target.value)} 
        value={input} 
        type="text" 
        placeholder='Search for courses' 
        className='w-full h-full outline-none bg-transparent 
          text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] 
          transition-colors duration-300'
      />

      <button 
        type='submit' 
        className='bg-[var(--color-primary)] hover:bg-[#005B3B] transition-colors duration-300 
          rounded text-white font-semibold md:px-10 px-7 md:py-3 py-2 mx-1'
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
