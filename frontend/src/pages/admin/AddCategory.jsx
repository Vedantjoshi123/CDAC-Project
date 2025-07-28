import React, { useEffect, useState } from 'react';
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from '../../services/categoryService';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTag } from 'react-icons/fa';

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editIcon, setEditIcon] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getAllCategories();
    if (res.status === 'success') {
      setCategories(res.data || []);
    } else {
      toast.error('Failed to load categories');
    }
  };

  const handleAddCategory = async () => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      toast.warning('Category title is required');
      return;
    }

    if (categories.some(cat => cat.title.toLowerCase() === trimmed.toLowerCase())) {
      toast.info(`Category "${trimmed}" already exists`);
      return;
    }

    const res = await addCategory(trimmed, newIcon.trim());
    if (res.status === 'success') {
      toast.success(`Category "${trimmed}" added`);
      setNewTitle('');
      setNewIcon('');
      fetchCategories();
    } else {
      toast.error(res.message || 'Failed to add category');
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteCategory(id);
    if (res.status === 'success') {
      toast.success('Category deleted');
      fetchCategories();
    } else {
      toast.error(res.message || 'Failed to delete');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(categories[index].title);
    setEditIcon(categories[index].icon);
  };

  const handleSaveEdit = async (id) => {
    const trimmed = editTitle.trim();
    if (!trimmed) {
      toast.warning('Title cannot be empty');
      return;
    }

    const isDuplicate = categories.some(
      (cat, i) =>
        i !== editIndex && cat.title.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      toast.warning(`Category "${trimmed}" already exists`);
      return;
    }

    const res = await updateCategory(id, trimmed, editIcon.trim());
    if (res.status === 'success') {
      toast.success('Category updated');
      setEditIndex(null);
      fetchCategories();
    } else {
      toast.error(res.message || 'Update failed');
    }
  };

  return (
    <div
      className="min-h-screen w-full p-6"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <h2 className="text-3xl font-bold mb-8">Manage Course Categories</h2>

      {/* Add Category */}
      <div
        className="rounded-lg p-6 mb-10 shadow-md"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaPlus /> Add New Category
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Category Title"
            className="flex-1 px-4 py-2 rounded border"
            style={{
              backgroundColor: 'var(--color-input-bg)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
            }}
          />
          <input
            type="text"
            value={newIcon}
            onChange={(e) => setNewIcon(e.target.value)}
            placeholder="Emoji or Icon URL (optional)"
            className="flex-1 px-4 py-2 rounded border"
            style={{
              backgroundColor: 'var(--color-input-bg)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
            }}
          />
          <button
            onClick={handleAddCategory}
            className="px-5 py-2 rounded text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div
            key={cat.id || index}
            className="rounded-lg p-4 shadow flex flex-col gap-2"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            {editIndex === index ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="px-3 py-2 rounded border"
                  style={{
                    backgroundColor: 'var(--color-input-bg)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                  }}
                />
                <input
                  value={editIcon}
                  onChange={(e) => setEditIcon(e.target.value)}
                  className="px-3 py-2 rounded border"
                  style={{
                    backgroundColor: 'var(--color-input-bg)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                  }}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleSaveEdit(cat.id)}
                    className="px-4 py-1 rounded text-white"
                    style={{ backgroundColor: 'var(--color-success)' }}
                  >
                    <FaSave />
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="px-4 py-1 rounded text-white"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">{cat.icon || <FaTag />}</span>
                  <span>{cat.title}</span>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-2 rounded text-white bg-yellow-500 hover:bg-yellow-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600" 
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCategory;
