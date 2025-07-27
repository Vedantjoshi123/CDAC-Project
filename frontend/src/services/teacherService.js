// services/teacherService.js

import axios from 'axios';
import { config } from './config';

export async function updateTeacherProfile(teacherId, teacherData, token) {
  try {
    const url = `${config.serverUrl}/teachers/${teacherId}`;

    const formData = new FormData();

    // Append the teacher object as a JSON blob
    formData.append(
      'teacher',
      new Blob([JSON.stringify(teacherData)], { type: 'application/json' })
    );

    // Append image file if it exists
    if (teacherData.image instanceof File) {
      formData.append('image', teacherData.image);
    }

    const response = await axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // DO NOT set Content-Type manually for multipart/form-data
      },
    });

    return {
      status: 'success',
      data: response.data,
    };
  } catch (error) {
    console.error('Error updating teacher profile:', error.response?.data || error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to update teacher profile',
    };
  }
}
