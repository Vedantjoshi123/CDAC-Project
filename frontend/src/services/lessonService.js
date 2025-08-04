// src/services/lessonService.js

import axios from 'axios';
import { config } from './config';

const BASE_URL = `${config.serverUrl}/lessons`;

export async function getLessonsByChapter(chapterId) {
  try {
    const response = await axios.get(`${BASE_URL}/${chapterId}`);
    const normalizedData = response.data.map(lesson => ({
      ...lesson,
      isAvailable:
        lesson.available  === true ||
        lesson.available  === 'true' ||
        lesson.available  === 1,
    }));
    return { status: 'success', data: normalizedData };
  } catch (err) {
    return {
      status: 'error',
      message: err.response?.data?.message || 'Failed to fetch lessons',
    };
  }
}

export async function addLesson(chapterId, lessonData) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/${chapterId}`, lessonData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return { status: 'success', data: response.data };
  } catch (err) {
    return {
      status: 'error',
      message: err.response?.data?.message || 'Failed to add lesson',
    };
  }
}

export async function updateLesson(lessonId, updatedData) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${BASE_URL}/${lessonId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return { status: 'success', data: response.data };
  } catch (err) {
    return {
      status: 'error',
      message: err.response?.data?.message || 'Failed to update lesson',
    };
  }
}

export async function deleteLesson(lessonId) {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${BASE_URL}/${lessonId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', message: 'Lesson deleted successfully' };
  } catch (err) {
    return {
      status: 'error',
      message: err.response?.data?.message || 'Failed to delete lesson',
    };
  }
}
