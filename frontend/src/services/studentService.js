import axios from 'axios';
import { config } from './config';

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
        // Don't set Content-Type manually for FormData
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
