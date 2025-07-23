import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext)

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className='border pb-6 overflow-hidden rounded-lg 
        border-[var(--color-border)] bg-[var(--color-bg)] 
        transition-colors duration-300 shadow-sm hover:shadow-md'
    >
      <img className='w-full' src={course.courseThumbnail} alt={course.courseTitle} />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold text-[var(--color-text)]'>{course.courseTitle}</h3>
        <p className='text-[var(--color-text-secondary)]'>Unknown</p>

        <div className='flex items-center gap-x-2 mt-1 text-sm'>
  <span className='text-[var(--color-text-secondary)]'>
    {calculateRating(course)}
  </span>
  
  <div className='flex gap-x-0.5'>
    {[...Array(5)].map((_, i) => (
      <img
        key={i}
        src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
        alt=''
        className='w-4 h-4'
      />
    ))}
  </div>
  
  <span className='text-[var(--color-text-secondary)]'>
    ({course.courseRatings.length})
  </span>
</div>


        <p className='text-base font-semibold mt-2 text-[var(--color-text)]'>
          {currency}
          {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

export default CourseCard
