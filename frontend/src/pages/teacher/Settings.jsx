import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const Settings = () => {
  const { user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    qualification: user?.qualification || '',
    experience: user?.experience || '',
    about: user?.about || '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API update logic here
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-4">
      <h2 className="text-2xl font-bold mb-6">Teacher Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            placeholder="Qualification"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="experience"
            value={formData.experience}
            placeholder="Experience (in years)"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <textarea
          name="about"
          value={formData.about}
          placeholder="About / Bio"
          onChange={handleChange}
          rows="4"
          className="w-full border p-2 rounded resize-none"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Settings;
