import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  const { allCourses, fetchAllCourses } = useContext(AppContext);

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) {
      fetchAllCourses();
    }
  }, []);

  return (
    <section className="py-20 md:px-24 px-6 bg-[var(--color-bg)]">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-[var(--color-text)]">Learn from the Best</h2>
        <p className="mt-3 text-[var(--color-text-secondary)] text-sm md:text-base max-w-2xl mx-auto">
          Explore a curated selection of top-rated courses in development, design, business, and more. 
          Start your journey with expert instructors and career-ready content.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.isArray(allCourses) &&
          allCourses.slice(0, 4).map((course, index) => (
            <CourseCard key={index} course={course} />
          ))
        }
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/course-list"
          onClick={() => scrollTo(0, 0)}
          className="inline-block bg-[var(--color-primary)] text-white px-8 py-3 rounded-full 
            hover:bg-white hover:text-[var(--color-primary)] border border-[var(--color-primary)] 
            font-semibold transition duration-300"
        >
          Show All Courses
        </Link>
      </div>
    </section>
  );
};

export default CoursesSection;
