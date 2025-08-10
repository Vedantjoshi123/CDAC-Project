import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const StudentDashboard = () => {
  const { currency, user, config } = useContext(AppContext); // assuming you have user & config in context
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    if (!user?.id) return; // no user, skip fetch
    setLoading(true);
    setError(null);

    try {
      // Example API endpoint, replace with your actual endpoint
      const url = `${config.serverUrl}/students/${user.id}/dashboard`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setDashboardData(response.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data.');
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user?.id]);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        {error}
      </div>
    );

  return (
    <div
      className="min-h-screen flex flex-col gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <div className="space-y-5">
        {/* Stats Cards */}
        <div className="flex flex-wrap gap-5 items-center">
          {/* Total Courses Enrolled */}
          <div
            className="flex items-center gap-3 p-4 w-56 rounded-md border shadow-card"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
          >
            <img src={assets.patients_icon} alt="enrolled courses" />
            <div>
              <p className="text-2xl font-medium" style={{ color: 'var(--color-text)' }}>
                {dashboardData.myEnrollments?.length || 0}
              </p>
              <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
                Courses Enrolled
              </p>
            </div>
          </div>

          {/* Completed Courses */}
          <div
            className="flex items-center gap-3 p-4 w-56 rounded-md border shadow-card"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
          >
            <img src={assets.appointments_icon} alt="completed courses" />
            <div>
              <p className="text-2xl font-medium" style={{ color: 'var(--color-text)' }}>
                {dashboardData.completedCourses || 0}
              </p>
              <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
                Completed Courses
              </p>
            </div>
          </div>

          {/* Total Learning Hours */}
          <div
            className="flex items-center gap-3 p-4 w-56 rounded-md border shadow-card"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
          >
            <img src={assets.earning_icon} alt="learning hours" />
            <div>
              <p className="text-2xl font-medium" style={{ color: 'var(--color-text)' }}>
                {dashboardData.totalLearningHours || 0} hrs
              </p>
              <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
                Total Learning Hours
              </p>
            </div>
          </div>
        </div>

        {/* Latest Enrolled Courses */}
        <div>
          <h2 className="pb-4 text-lg font-medium" style={{ color: 'var(--color-text)' }}>
            Latest Enrolled Courses
          </h2>
          <div
            className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md border"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
          >
            {dashboardData.myEnrollments?.length > 0 ? (
              <table className="table-fixed md:table-auto w-full overflow-hidden">
                <thead
                  className="text-sm text-left border-b"
                  style={{
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                  }}
                >
                  <tr>
                    <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                    <th className="px-4 py-3 font-semibold">Course Title</th>
                    <th className="px-4 py-3 font-semibold">Instructor</th>
                    <th className="px-4 py-3 font-semibold">Progress</th>
                  </tr>
                </thead>
                <tbody className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {dashboardData.myEnrollments.map((course, index) => (
                    <tr key={course.id || index} className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                      <td className="px-4 py-3 truncate">{course.title}</td>
                      <td className="px-4 py-3">{course.instructorName}</td>
                      <td className="px-4 py-3">{course.progressPercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-4 text-center text-sm text-gray-500">No enrolled courses found.</p>
            )}
          </div>
        </div>

        {/* Additional Useful Student Info */}

        {/* Notifications Section */}
        <div>
          <h2 className="pb-4 text-lg font-medium" style={{ color: 'var(--color-text)' }}>
            Notifications
          </h2>
          {dashboardData.notifications?.length > 0 ? (
            <ul
              className="max-w-4xl w-full rounded-md border p-4"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
            >
              {dashboardData.notifications.map((note, i) => (
                <li key={i} className="mb-2 last:mb-0">
                  {note.message} <span className="text-xs italic">({new Date(note.date).toLocaleDateString()})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-center text-gray-500">No new notifications.</p>
          )}
        </div>

        {/* Summary of Progress - Could be a graph or detailed list */}
        {/* For simplicity, showing average rating if exists */}
        {dashboardData.averageRating !== undefined && (
          <div>
            <h2 className="pb-4 text-lg font-medium" style={{ color: 'var(--color-text)' }}>
              Your Average Course Rating
            </h2>
            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
              {dashboardData.averageRating.toFixed(2)} / 5 ⭐
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
