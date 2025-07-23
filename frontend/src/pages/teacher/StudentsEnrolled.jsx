import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/student/Loading'

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled)
  }

  useEffect(() => {
    fetchEnrolledStudents()
  }, [])

  return enrolledStudents ? (
    <div
      className="min-h-screen flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-0"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <div
        className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md"
        style={{
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
        }}
      >
        <table className="w-full table-auto overflow-hidden">
          <thead
            className="text-sm text-left"
            style={{
              color: 'var(--color-text)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
              <th className="px-4 py-3 font-semibold">Student Name</th>
              <th className="px-4 py-3 font-semibold">Course Title</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody style={{ color: 'var(--color-text-secondary)' }} className="text-sm">
            {enrolledStudents.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                  <img
                    src={item.student.imageUrl}
                    alt="Student"
                    className="w-9 h-9 rounded-full border"
                    style={{ borderColor: 'var(--color-border)' }}
                  />
                  <span className="truncate">{item.student.name}</span>
                </td>
                <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default StudentsEnrolled
