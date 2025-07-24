import React from 'react';
import { adminTestimonials } from '../../assets/assets';

const AdminTestimonial = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Student Testimonials</h2>
      <div className="space-y-4">
        {adminTestimonials.map((t) => (
          <div key={t.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-gray-700 dark:text-gray-200 italic">"{t.content}"</p>
            <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">- {t.student} ({t.course})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonial;
