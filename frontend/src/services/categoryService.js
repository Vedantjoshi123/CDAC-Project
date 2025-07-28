// services/categoryService.js

import axios from 'axios';
import { config } from './config';

const BASE_URL = `${config.serverUrl}/categories`;

// ✅ Get All Categories
export async function getAllCategories() {
  try {
    const response = await axios.get(BASE_URL);
    return {
      status: 'success',
      data: response.data || [],
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.response?.data?.message || 'Error fetching categories',
    };
  }
}

// ➕ Add New Category
export async function addCategory(title, icon = '') {
  try {
    const body = { title, icon };
    const response = await axios.post(BASE_URL, body);
    return {
      status: 'success',
      data: response.data,
    };
  } catch (error) {
    console.error('Error adding category:', error.response?.data, error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to add category',
    };
  }
}

// ✏️ Update Category by ID
export async function updateCategory(id, title, icon = '') {
  try {
    const body = { title, icon };
    const response = await axios.put(`${BASE_URL}/${id}`, body);
    return {
      status: 'success',
      data: response.data,
    };
  } catch (error) {
    console.error(`Error updating category ${id}:`, error.response?.data, error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to update category',
    };
  }
}

// ❌ Delete Category by ID
export async function deleteCategory(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return {
      status: 'success',
      message: 'Category deleted successfully',
    };
  } catch (error) {
    console.error(`Error deleting category ${id}:`, error.response?.data, error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to delete category',
    };
  }
}

// 🔍 Get Category by ID
export async function getCategoryById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return {
      status: 'success',
      data: response.data,
    };
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error.response?.data, error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to get category',
    };
  }
}
