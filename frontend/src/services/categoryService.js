import axios from "axios";
import { config } from "./config";

const BASE_URL = `${config.serverUrl}/categories`;

// Get All
export async function getAllCategories() {
  try {
    const response = await axios.get(BASE_URL);
    return {
      status: "success",
      data: response.data || [],
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || "Error fetching categories",
    };
  }
}

// Add
export async function addCategory(title, iconFile) {
  try {
    const formData = new FormData();
    formData.append("title", title);
    if (iconFile) {
      formData.append("icon", iconFile);
    }

    const response = await axios.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.error || "Failed to add category",
    };
  }
}

// Update
export async function updateCategory(id, title, iconFile) {
  try {
    const formData = new FormData();
    formData.append("title", title);
    if (iconFile) {
      formData.append("icon", iconFile);
    }

    const response = await axios.put(`${BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.error || "Failed to update category",
    };
  }
}

// Delete
export async function deleteCategory(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return {
      status: "success",
      message: "Category deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || "Failed to delete category",
    };
  }
}

// Get by ID (optional)
export async function getCategoryById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || "Failed to get category",
    };
  }
}
