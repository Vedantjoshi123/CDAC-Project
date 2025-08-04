import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';

const MyCourses = () => {
  const { currency, allCourses, user } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(allCourses) && user?.userRole === 'TEACHER') {
      const teacherCourses = allCourses.filter(course =>
        course.teacher?.id === user.id || course.teacherId === user.id
      );
      setCourses(teacherCourses);
    } else {
      setCourses([]);
    }
  }, [allCourses, user]);

  const handleEditCourse = (courseId) => {
    navigate(`/teacher/edit-course/${courseId}`);
  };

  const handleManageChapters = (courseId) => {
    navigate(`/teacher/manage-chapters/${courseId}`);
  };

  if (!courses) return <Loading />;
  if (courses.length === 0)
    return <div className="p-8 text-center text-gray-500">No courses found.</div>;

  return (
    <div
      className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-0"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <div className="w-full">
        <h2 className="pb-4 text-lg font-semibold">My Courses</h2>
        <div
          className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md"
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
          }}
        >
          <table className="w-full table-auto overflow-hidden">
            <thead
              style={{
                color: 'var(--color-text)',
                borderBottom: '1px solid var(--color-border)',
              }}
              className="text-sm text-left"
            >
              <tr>
                <th className="px-4 py-3 font-semibold truncate">All Courses</th>
                <th className="px-4 py-3 font-semibold truncate">Earnings</th>
                <th className="px-4 py-3 font-semibold truncate">Students</th>
                <th className="px-4 py-3 font-semibold truncate">Published On</th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text-secondary)' }}>
              {courses.map(course => (
                <tr
                  key={course.id || course._id || course.title}
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img
                      src={`http://localhost:8080/${course.thumbnail}`}
                      alt="Course Thumbnail"
                      className="w-16 h-12 object-cover rounded border"
                      onError={e => (e.target.src = "/fallback.jpg")}
                    />
                    <span className="truncate hidden md:block">{course.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    {currency}
                    {Math.floor(
                      (course.enrolledStudents?.length || 0) *
                      (course.price - (course.discount * course.price) / 100)
                    )}
                  </td>
                  <td className="px-4 py-3">{course.enrolledStudents?.length || 0}</td>
                  <td className="px-4 py-3">
                    {course.createdOn
                      ? new Date(course.createdOn).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEditCourse(course.id)}
                      className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleManageChapters(course.id)}
                      className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      Add Chapters
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
