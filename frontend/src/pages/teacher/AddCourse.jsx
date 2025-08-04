import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { config } from '../../services/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCourse = () => {
  const navigate = useNavigate();
  const { fetchAllCourses, categories, fetchAllCategories } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',  
    overview: '', 
    price: '',
    discount: 0,
    thumbnail: null,
    resource: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchAllCategories(); // Load categories on mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setErrorMsg('');

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?.id) {
    setErrorMsg("Teacher not found. Please log in again.");
    setIsLoading(false);
    return;
  }

  const form = new FormData();
  form.append('title', formData.title);
  form.append('description', formData.description);
  form.append('categoryId', formData.categoryId);
  form.append('price', formData.price);
  form.append('overview', formData.overview);
  form.append('discount', formData.discount);
  form.append('teacherId', user.id);
  if (formData.thumbnail) form.append('thumbnail', formData.thumbnail);
  if (formData.resource) form.append('resource', formData.resource);

  try {
    const response = await axios.post(`${config.serverUrl}/courses`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const createdCourse = response.data;

    // Check if the course is actually created
    if (!createdCourse?.id) {
      throw new Error("Course creation failed on server.");
    }
    toast.success("Course created successfully!");
    await fetchAllCourses();
    navigate('/teacher');
  } catch (err) {
    console.error("Error submitting course:", err);

    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      "Something went wrong while creating the course.";

    toast.error(`${message}`);
    setErrorMsg(message);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Add New Course</h2>

      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          >
            <option value="">-- Select a category --</option>
            {Array.isArray(categories) && categories.map((cat) => (
              <option key={cat.id || cat._id} value={cat.id || cat._id}>
                {cat.title || cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Price (₹)</label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Overview</label>
          <textarea
            name="overview"
            required
            rows={3}
            placeholder="Enter bullet points or summary"
            value={formData.overview}
            onChange={handleInputChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Resource File (PDF, ZIP, etc)</label>
          <input
            type="file"
            name="resource"
            onChange={handleInputChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
        >
          {isLoading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
