import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import Footer from '../../components/common/Footer';

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);

  const [progressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 6, totalLectures: 6 },
    { lectureCompleted: 1, totalLectures: 8 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 5, totalLectures: 12 },
    { lectureCompleted: 6, totalLectures: 14 },
    { lectureCompleted: 7, totalLectures: 16 },
    { lectureCompleted: 8, totalLectures: 18 },
    { lectureCompleted: 9, totalLectures: 20 }
  ]);

  return (
    <>
      <div
        className="min-h-screen pt-20 md:px-36 px-6"
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
        }}
      >
        <h1 className="text-2xl font-semibold mb-6">My Enrollments</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm" style={{ borderColor: 'var(--color-border)' }}>
            <thead
              style={{
                backgroundColor: 'var(--color-bg)',
                borderBottom: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              <tr>
                <th className="px-4 py-3 font-medium text-left">Course</th>
                <th className="px-4 py-3 font-medium text-left max-sm:hidden">Duration</th>
                <th className="px-4 py-3 font-medium text-left max-sm:hidden">Completed</th>
                <th className="px-4 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'background 0.3s',
                  }}
                  className="hover:bg-[var(--color-border)]"
                >
                  <td className="px-4 py-4 flex items-center gap-3">
                    <img
                      src={course.courseThumbnail}
                      alt="thumbnail"
                      className="w-14 sm:w-24 md:w-28 rounded object-cover"
                      style={{ border: '1px solid var(--color-border)' }}
                    />
                    <div className="flex-1">
                      <p
                        className="font-medium truncate"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {course.courseTitle}
                      </p>
                      <Line
                        strokeWidth={2}
                        strokeColor="var(--color-primary)"
                        trailColor="var(--color-border)"
                        percent={
                          progressArray[index]
                            ? (progressArray[index].lectureCompleted * 100) /
                              progressArray[index].totalLectures
                            : 0
                        }
                      />
                    </div>
                  </td>

                  <td className="px-4 py-4 max-sm:hidden" style={{ color: 'var(--color-text-secondary)' }}>
                    {calculateCourseDuration(course)}
                  </td>

                  <td className="px-4 py-4 max-sm:hidden" style={{ color: 'var(--color-text-secondary)' }}>
                    {progressArray[index] &&
                      `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}{' '}
                    Lectures
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => navigate('/player/' + course._id)}
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        fontWeight: '600',
                        transition: 'background-color var(--transition-speed)',
                      }}
                      onMouseOver={e => (e.target.style.backgroundColor = '#005B3B')}
                      onMouseOut={e => (e.target.style.backgroundColor = 'var(--color-primary)')}
                    >
                      {progressArray[index] &&
                      progressArray[index].lectureCompleted /
                        progressArray[index].totalLectures ===
                        1
                        ? 'Completed'
                        : 'In Progress'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyEnrollments;
