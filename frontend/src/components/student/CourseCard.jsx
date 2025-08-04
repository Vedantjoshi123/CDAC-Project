import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { config } from '../../services/config';
import { getTeacherById } from '../../services/teacherService';
import { getAverageRating } from '../../services/feedbackService';

const CourseCard = ({ course }) => {
  const { currency } = useContext(AppContext);
  const [teacherName, setTeacherName] = useState('Loading...');
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const loadTeacherName = async () => {
      try {
        const teacher = await getTeacherById(course.teacherId);
        if (teacher) {
          setTeacherName(`${teacher.firstName} ${teacher.lastName}`);
        } else {
          setTeacherName('Unknown');
        }
      } catch (err) {
        setTeacherName('Unknown');
      }
    };

    const loadRating = async () => {
      try {
        const rating = await getAverageRating(course.id);
        setAverageRating(rating);
      } catch (err) {
        setAverageRating(0);
      }
    };

    if (course.teacherId) loadTeacherName();
    if (course.id) loadRating();
  }, [course.teacherId, course.id]);

  return (
    <Link
      to={`/course/${course.id}`}
      onClick={() => scrollTo(0, 0)}
      className="group flex flex-col justify-between h-full rounded-2xl overflow-hidden bg-[var(--color-bg)] border border-[var(--color-border)] shadow-md hover:shadow-lg transition duration-300"
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={course.thumbnail ? `${config.serverUrl}/${course.thumbnail}` : "/default-thumbnail.jpg"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300 p-5"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-[var(--color-text)] truncate">{course.title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">{teacherName}</p>

        <div className="flex items-center gap-2">
          <span className="text-sm align-items-center text-[var(--color-text-secondary)]">
            ({Math.round(averageRating)})
          </span>
          <div className="flex gap-x-0.5">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(averageRating) ? assets.star : assets.star_blank}
                alt=""
                className="w-4 h-4"
              />
            ))}
          </div>
          {/* Optional: Replace 5 with feedback count */}
          <span className="text-sm text-[var(--color-text-secondary)]">(5)</span>
        </div>

        <div className="pt-2 flex items-center gap-2">
          <p className="text-base font-bold text-[var(--color-text)]">
            {currency || '₹'}{' '}
            {(course.price - (course.discount * course.price) / 100).toFixed(2)}
          </p>
          {course.discount > 0 && (
            <p className="text-sm text-gray-400 line-through">
              {currency || '₹'} {course.price.toFixed(2)}
            </p>
          )}
        </div>

      </div>
    </Link>
  );
};

export default CourseCard;
