import axios from 'axios';
import { config } from './config';

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

// ✅ Update student profile
export async function updateStudentProfile(studentId, studentData) {
  if (!studentId || !studentData) {
    throw new Error("Student ID and data are required");
  }

  try {
    const url = `${config.serverUrl}/students/${studentId}`;
    const response = await axios.put(url, studentData, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error updating student profile:", error.response?.data || error.message);
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
