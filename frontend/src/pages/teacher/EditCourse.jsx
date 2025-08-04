import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import { getCourseById, updateCourse } from '../../services/courseService';

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { categories, fetchAllCourses, fetchAllCategories } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    overview: '',
    price: '',
    discount: 0,
    thumbnail: null,
    resource: null,
  });

  const [existingThumbnail, setExistingThumbnail] = useState('');
  const [existingResource, setExistingResource] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load categories if not already loaded
  useEffect(() => {
    if (!Array.isArray(categories) || categories.length === 0) {
      fetchAllCategories();
    }
  }, [categories, fetchAllCategories]);

  // Load course data
  useEffect(() => {
    if (!courseId) return;

    const loadCourseData = async () => {
      const result = await getCourseById(courseId);
      if (result.status === 'success') {
        const course = result.data;
        setFormData({
          title: course.title || '',
          description: course.description || '',
          categoryId: course.categoryId || '',
          overview: course.overview || '',
          price: course.price || '',
          discount: course.discount || 0,
          thumbnail: null,
          resource: null,
        });
        setExistingThumbnail(course.thumbnail);
        setExistingResource(course.resource);
      } else {
        toast.error(result.message);
      }
    };

    loadCourseData();
  }, [courseId]);

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

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) {
      toast.error('User not found.');
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

    const result = await updateCourse(courseId, form);
    if (result.status === 'success') {
      toast.success('Course updated successfully!');
      fetchAllCourses();
      navigate('/teacher');
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Edit Course</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
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

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          />
        </div>

        {/* Category */}
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
            {Array.isArray(categories) &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title || cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* Price & Discount */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Price (₹)</label>
            <input
              type="number"
              name="price"
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

        {/* Overview */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Overview</label>
          <textarea
            name="overview"
            rows={3}
            value={formData.overview}
            onChange={handleInputChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          />
        </div>

        {/* Existing Thumbnail */}
        {existingThumbnail && (
          <div>
            <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">Current Thumbnail:</p>
            <img
              src={`http://localhost:8080/${existingThumbnail}`}
              alt="Current Thumbnail"
              className="w-32 h-20 object-cover rounded"
            />
          </div>
        )}

        {/* Upload New Thumbnail */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Change Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          />
        </div>

        {/* Existing Resource Link */}
        {existingResource && (
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Current Resource:&nbsp;
            <a
              href={`http://localhost:8080/${existingResource}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download/View
            </a>
          </div>
        )}

        {/* Upload New Resource */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Change Resource</label>
          <input
            type="file"
            name="resource"
            onChange={handleInputChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? 'Updating...' : 'Update Course'}
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
