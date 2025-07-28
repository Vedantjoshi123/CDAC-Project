import axios from 'axios';
import { config } from './config';

// ✅ Update student profile (with optional image)
export async function updateStudentProfile(studentId, studentData, token) {
  try {
    const url = `${config.serverUrl}/students/${studentId}`;

    const formData = new FormData();

    // Append the student object as a JSON blob
    formData.append(
      'student',
      new Blob([JSON.stringify(studentData)], { type: 'application/json' })
    );

    // Append image file if it exists
    if (studentData.image instanceof File) {
      formData.append('image', studentData.image);
    }

    const response = await axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Do not manually set 'Content-Type'
      },
    });

    return {
      status: 'success',
      data: response.data,
    };
  } catch (error) {
    console.error('Error updating student profile:', error.response?.data || error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to update student profile',
    };
  }
}

// Utility to get Authorization headers
function authHeader() {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

// ✅ Get student details by userId
export async function getStudentById(userId) {
  if (!userId) throw new Error("User ID is required");

  try {
    const url = `${config.serverUrl}/students/${userId}`;
    const response = await axios.get(url, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error.response?.data || error.message);
    throw error;
  }
}

// ✅ Get all students (for admin)
export async function getAllStudents() {
  try {
    const response = await axios.get(`${config.serverUrl}/students`, authHeader());
    return { status: 'success', data: response.data };
  } catch (error) {
    console.error('Get all students error:', error.response?.data || error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to fetch students',
    };
  }
}

// ✅ Delete student by ID (for admin)
export async function deleteStudent(studentId) {
  if (!studentId) throw new Error("Student ID is required");

  try {
    await axios.delete(`${config.serverUrl}/students/${studentId}`, authHeader());
    return { status: 'success' };
  } catch (error) {
    console.error('Delete student error:', error.response?.data || error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to delete student',
    };
  }
}
