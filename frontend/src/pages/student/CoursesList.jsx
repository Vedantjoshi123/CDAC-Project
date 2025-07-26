import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/common/Footer';

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      const filtered = input
        ? tempCourses.filter(item =>
          item.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
        : tempCourses;

      setFilteredCourse(filtered);
      setCurrentPage(1);
    }
  }, [allCourses, input]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourse.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourse.length / coursesPerPage);

  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-[var(--color-text)]'>
              Course List
            </h1>
            <p className='text-[var(--color-text-secondary)]'>
              <span
                className='text-[var(--color-primary)] cursor-pointer'
                onClick={() => navigate('/')}
              >
                Home
              </span>
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && (
          <div className='inline-flex items-center gap-3 px-4 py-2 border rounded-md mt-8 mb-8 text-[var(--color-text-secondary)] border-[var(--color-border)] bg-[var(--color-bg)]'>
            <p className='text-sm m-0 leading-none'>{input}</p>
            <img
              src={assets.cross_icon}
              alt='Clear'
              className='w-4 h-4 cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
          {currentCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">

            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="bg-[var(--color-primary)] hover:bg-[#005B3B] transition-colors duration-300 
                          rounded text-white font-semibold px-4 py-2 mx-1"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const isActive = currentPage === i + 1;
              const isCircle = i + 1 === 1 || i + 1 === 2;

              return (
                <button
                  key={i}
                  className={`transition-colors duration-300 mx-1 font-semibold 
                            ${isCircle ? 'w-10 h-10 rounded-full flex items-center justify-center' : 'px-4 py-2 rounded'} 
                            ${isActive ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-white text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[#005B3B] hover:text-white'
                    }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="bg-[var(--color-primary)] hover:bg-[#005B3B] transition-colors duration-300 
                          rounded text-white font-semibold px-4 py-2 mx-1"
            >
              Next
            </button>
          </div>
        )}

      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
