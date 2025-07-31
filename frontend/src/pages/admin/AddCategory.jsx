import React, { useEffect, useState, useRef } from "react";
import {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "../../services/categoryService";
import { toast } from "react-toastify";
import { config } from "../../services/config";
import { Pencil, Trash2 } from "lucide-react";

function AddCategory() {
  const [newTitle, setNewTitle] = useState("");
  const [newIcon, setNewIcon] = useState(null);
  const [previewIcon, setPreviewIcon] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getAllCategories();
    if (res.status === "success") {
      setCategories(res.data || []);
    } else {
      toast.error("Failed to fetch categories");
    }
  };

  const resetForm = () => {
    setNewTitle("");
    setNewIcon(null);
    setPreviewIcon(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewIcon(file);
      setPreviewIcon(URL.createObjectURL(file));
    }
  };

  const resolveImageUrl = (iconPath) => {
    if (!iconPath) return "https://via.placeholder.com/80?text=No+Image";
    return iconPath.startsWith("http")
      ? iconPath
      : `${config.serverUrl}/${iconPath}`;
  };

  const handleSubmit = async () => {
    const trimmed = newTitle.trim();
    if (!trimmed || (!newIcon && !editingId)) {
      toast.warning("Both title and icon are required");
      return;
    }

    const res = editingId
      ? await updateCategory(editingId, trimmed, newIcon)
      : await addCategory(trimmed, newIcon);

    if (res.status === "success") {
      toast.success(
        editingId ? "Category updated successfully" : "Category added"
      );
      resetForm();
      fetchCategories();
    } else {
      toast.error(res.message);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setNewTitle(cat.title);
    setPreviewIcon(resolveImageUrl(cat.icon));
  };

  const handleDelete = async (id) => {
    const res = await deleteCategory(id);
    if (res.status === "success") {
      toast.success("Category deleted");
      fetchCategories();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[var(--color-bg)] shadow-md rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary)] mb-6">
          {editingId ? "Edit Category" : "Add New Category"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter category title"
            className="border px-4 py-2 rounded-md outline-none bg-transparent text-sm md:text-base"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          />

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleImagePreview}
            accept="image/*"
            className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[var(--color-primary)] file:text-white hover:file:opacity-90"
          />
        </div>

        {previewIcon && (
          <div className="mb-4 text-center">
            <p className="font-medium text-sm mb-2">Image Preview</p>
            <img
              src={previewIcon}
              alt="Preview"
              className="w-28 h-28 mx-auto object-contain rounded-lg border bg-white"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-[var(--color-primary)] hover:bg-opacity-90 text-white px-6 py-2 rounded-lg w-full sm:w-auto"
          >
            {editingId ? "Update" : "Add"} Category
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg w-full sm:w-auto"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4 text-center">
        All Categories
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center bg-white dark:bg-gray-100 rounded-xl shadow hover:shadow-md p-4 transition border border-[var(--color-border)]"
          >
            <img
              src={resolveImageUrl(cat.icon)}
              alt={cat.title}
              className="w-20 h-20 object-fill rounded-full border mb-2 bg-white"
              style={{ borderColor: "var(--color-border)" }}
            />
            <span className="text-sm text-center font-medium text-[var(--color-text-secondary)]">
              {cat.title}
            </span>

            <div className="flex justify-center gap-4 mt-3">
              <button
                onClick={() => handleEdit(cat)}
                className="p-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="p-1 rounded-full bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCategory;
