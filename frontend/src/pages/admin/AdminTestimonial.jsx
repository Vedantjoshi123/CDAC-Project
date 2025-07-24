import React, { useEffect, useState } from 'react';
import AddTestimonialModal from '../../components/admin/AddTestimonialModal';
import EditTestimonialModal from '../../components/admin/EditTestimonialModal';
import { testimonialService } from '../../services/testimonialService';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const AdminTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await testimonialService.deleteTestimonial(id);
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await testimonialService.updateTestimonial(id, updatedData);
      toast.success('Testimonial updated');
      fetchTestimonials();
    } catch (error) {
      toast.error('Update failed');
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
          onClick={() => {
            setEditingTestimonial(null);
            setShowAddModal(true);
          }}
          className="text-white px-4 py-2 rounded bg-[var(--color-primary)] hover:opacity-90 transition"
        >
          Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2"
          >
            <div className="flex items-center mb-3">
              <img
                src={t.image}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {t.name}
                </p>
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
            <p className="text-gray-700 dark:text-gray-200 italic">
              "{t.feedback}"
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => handleEdit(t)}
                className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:opacity-90"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddTestimonialModal
          onClose={() => setShowAddModal(false)}
          onAdd={fetchTestimonials}
        />
      )}

      {editingTestimonial && (
        <EditTestimonialModal
          testimonial={editingTestimonial}
          onClose={() => setEditingTestimonial(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default AdminTestimonial;
