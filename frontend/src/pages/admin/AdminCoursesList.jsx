import React from 'react';
import { adminCourses } from '../../assets/assets';

const AdminCoursesList = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Teacher</th>
              <th className="px-4 py-2">Students</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {adminCourses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2">{course.title}</td>
                <td className="px-4 py-2">{course.teacher}</td>
                <td className="px-4 py-2">{course.students}</td>
                <td className="px-4 py-2">{course.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCoursesList;
