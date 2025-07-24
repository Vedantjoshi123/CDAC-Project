import React from 'react';
import { adminCourses, adminTeachers } from '../../assets/assets';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-xl">
          <h3 className="text-xl font-medium mb-2">Total Courses</h3>
          <p className="text-3xl">{adminCourses.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-xl">
          <h3 className="text-xl font-medium mb-2">Total Teachers</h3>
          <p className="text-3xl">{adminTeachers.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
