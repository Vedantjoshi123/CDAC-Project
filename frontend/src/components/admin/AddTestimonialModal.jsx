import React, { useState } from 'react';
import { testimonialService } from '../../services/testimonialService';

const AddTestimonialModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    feedback: '',
    rating: 5,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await testimonialService.addTestimonial(formData);
      toast.success('Testimonial added successfully');
      onAdd(); // refresh testimonial list
      onClose(); // close modal
    } catch (err) {
       toast.error('Failed to add testimonial');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-semibold mb-4">Add Testimonial</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="feedback"
            placeholder="Feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          ></textarea>
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestimonialModal;
