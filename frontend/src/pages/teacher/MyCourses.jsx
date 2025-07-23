import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext)
  const [courses, setCourses] = useState(null)

  const fetchTeacherCourses = async () => {
    setCourses(allCourses)
  }

  useEffect(() => {
    fetchTeacherCourses()
  }, [])

  return courses ? (
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
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text-secondary)' }}>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img
                      src={course.courseThumbnail}
                      alt="Course"
                      className="w-16 h-12 object-cover rounded border"
                      style={{ borderColor: 'var(--color-border)' }}
                    />
                    <span className="truncate hidden md:block">{course.courseTitle}</span>
                  </td>
                  <td className="px-4 py-3">
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice - (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                  <td className="px-4 py-3">
                    {new Date(course.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default MyCourses
