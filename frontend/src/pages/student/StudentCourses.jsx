import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentById, getEnrolledCoursesByStudentId } from '../../services/studentService';

const StudentCourses = () => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) return;

    setLoading(true);
    setError('');

    getStudentById(user.id)
      .then(data => setStudent(data))
      .catch(() => setError('Failed to load student data'))
      .finally(() => setLoading(false));

    fetchEnrolledCourses(user.id);
  }, [user.id]);

  async function fetchEnrolledCourses(studentId) {
    setLoading(true);
    setError('');
    try {
      const coursesData = await getEnrolledCoursesByStudentId(studentId);
      setCourses(coursesData);
    } catch {
      setError('Failed to load enrolled courses');
    } finally {
      setLoading(false);
    }
  }

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Styles following your theme variables
  const containerStyle = {
    maxWidth: 900,
    margin: '30px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thTdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid var(--color-border)',
    textAlign: 'left',
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
  };

  const trHover = {
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const trHoverActive = {
    backgroundColor: 'var(--color-hover)',
  };

  const buttonStyle = {
    padding: '6px 12px',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
  };

  const headerStyle = {
    color: 'var(--color-primary)',
    marginBottom: '12px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>My Courses</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {student && (
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          Welcome, <b>{student.firstName} {student.lastName}</b>
        </p>
      )}

      {courses.length === 0 && !loading && (
        <p>No active courses enrolled.</p>
      )}

      {courses.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Course Title</th>
              <th style={thStyle}>Purchase Date</th>
              <th style={thStyle}>Amount Paid ($)</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr
                key={course.courseId}
                style={trHover}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = trHoverActive.backgroundColor}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={thTdStyle}><strong>{course.courseTitle}</strong></td>
                <td style={thTdStyle}>{new Date(course.purchaseDate).toLocaleDateString()}</td>
                <td style={thTdStyle}>{course.amountPaid.toFixed(2)}</td>
                <td style={thTdStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => handleViewCourse(course.courseId)}
                  >
                    View Course
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentCourses;
