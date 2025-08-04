// services/courseService.js

import axios from "axios";
import { config } from "./config";

const BASE_URL = `${config.serverUrl}/courses`;

// Get all courses
export async function getAllCourses() {
  try {
    const response = await axios.get(BASE_URL);
    return {
      status: "success",
      data: response.data || [],
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || "Error fetching courses",
    };
  }
}

// Add a new course
export async function addCourse(courseFormData) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(BASE_URL, courseFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.error || "Failed to add course",
    };
  }
}

// Update a course
export async function updateCourse(courseId, courseFormData) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${BASE_URL}/${courseId}`, courseFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.error || "Failed to update course",
    };
  }
}

// Delete a course
export async function deleteCourse(courseId) {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${BASE_URL}/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: "success",
      message: "Course deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || "Failed to delete course",
    };
  }
}

// Get course by ID (optional)
export async function getCourseById(courseId) {
  try {
    const response = await axios.get(`${BASE_URL}/${courseId}`);
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || "Failed to get course",
    };
  }
}
