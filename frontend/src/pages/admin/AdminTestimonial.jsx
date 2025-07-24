import React, { useEffect, useState } from 'react';
import AddTestimonialModal from '../../components/admin/AddTestimonialModal';
import { testimonialService } from '../../services/testimonialService';
import { assets } from '../../assets/assets'; // Assuming star and star_blank are here

const AdminTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialService.getTestimonials();
      const processed = data.map((t) => ({
        ...t,
        image: t.image
          ? t.image
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=random&color=fff&rounded=true&size=128`,
      }));
      setTestimonials(processed);
    } catch (error) {
      toast.error('Failed to load testimonials');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Student Testimonials</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            {/* Top: Avatar, Name, Role */}
            <div className="flex items-center mb-3">
              <img src={t.image} alt="avatar" className="w-10 h-10 rounded-full mr-3 object-cover" />
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(t.rating) ? assets.star : assets.star_blank}
                  alt="star"
                  className="h-4 w-4"
                />
              ))}
            </div>

            {/* Feedback */}
            <p className="text-gray-700 dark:text-gray-200 italic">"{t.feedback}"</p>
          </div>
        ))}
      </div>

      {showModal && (
        <AddTestimonialModal
          onClose={() => setShowModal(false)}
          onAdd={fetchTestimonials}
        />
      )}
    </div>
  );
};

export default AdminTestimonial;
