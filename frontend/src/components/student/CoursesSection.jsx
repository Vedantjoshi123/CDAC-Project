import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {

  const { allCourses } = useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-[var(--color-text)]'>
        Learn from the best
      </h2>
      
      <p className='text-sm md:text-base text-[var(--color-text-secondary)] mt-3'>
        Discover our top-rated courses across various categories. From coding and design to <br />
        business and wellness, our courses are crafted to deliver results.
      </p>

      <div className='grid grid-cols-auto px-4 md:px-0 md:my-16 my-10 gap-4'>
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

 <Link 
  to={'/course-list'} 
  onClick={() => scrollTo(0, 0)} 
  className="bg-[var(--color-primary)] text-white 
    hover:bg-white hover:text-[var(--color-primary)] 
    border border-[var(--color-primary)] 
    px-10 py-3 rounded font-medium 
    transition-colors duration-300"
>
  Show all courses
</Link>


    </div>
  )
}

export default CoursesSection
