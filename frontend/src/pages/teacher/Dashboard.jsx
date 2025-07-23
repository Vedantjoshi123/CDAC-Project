import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div
      className="min-h-screen flex flex-col gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <div className="space-y-5">
        {/* Stats Cards */}
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-3 p-4 w-56 rounded-md border shadow-card"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
            <img src={assets.patients_icon} alt="enrollments" />
            <div>
              <p className="text-2xl font-medium" style={{ color: 'var(--color-text)' }}>
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
                Total Enrollments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 w-56 rounded-md border shadow-card"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
            <img src={assets.appointments_icon} alt="courses" />
            <div>
              <p className="text-2xl font-medium" style={{ color: 'var(--color-text)' }}>
                {dashboardData.totalCourses}
              </p>
              <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
                Total Courses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 w-56 rounded-md border shadow-card"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
            <img src={assets.earning_icon} alt="earnings" />
            <div>
              <p className="text-2xl font-medium" style={{ color: 'var(--color-text)' }}>
                {currency}{dashboardData.totalEarnings}
              </p>
              <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
                Total Earnings
              </p>
            </div>
          </div>
        </div>

        {/* Latest Enrollments */}
        <div>
          <h2 className="pb-4 text-lg font-medium" style={{ color: 'var(--color-text)' }}>
            Latest Enrollments
          </h2>
          <div
            className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md border"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
          >
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
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                    <td className="md:px-4 px-2 flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt="profile"
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
