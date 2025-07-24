import React from 'react';
import { adminTeachers } from '../../assets/assets';

const AdminTeachersList = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Teachers</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Course Count</th>
            </tr>
          </thead>
          <tbody>
            {adminTeachers.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2">{t.name}</td>
                <td className="px-4 py-2">{t.email}</td>
                <td className="px-4 py-2">{t.courseCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTeachersList;
