// src/services/chapterService.js

import axios from 'axios';
import { config } from './config';

const BASE_URL = `${config.serverUrl}/chapters`;

export async function getChaptersByCourse(courseId) {
  try {
    const response = await axios.get(`${BASE_URL}/${courseId}`);
    return { status: 'success', data: response.data };
  } catch (err) {
    return { status: 'error', message: err.response?.data?.message || 'Failed to fetch chapters' };
  }
}

export async function addChapter(courseId, data) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/${courseId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: 'success', data: response.data };
  } catch (err) {
    return { status: 'error', message: err.response?.data?.message || 'Failed to add chapter' };
  }
}

export async function deleteChapter(chapterId) {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${BASE_URL}/${chapterId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: 'success', message: 'Chapter deleted successfully' };
  } catch (err) {
    return { status: 'error', message: err.response?.data?.message || 'Failed to delete chapter' };
  }
}

export const updateChapter = async (chapterId, updatedData) => {
  try {
    const res = await axios.put(`/chapters/${chapterId}`, updatedData);
    return { status: 'success', data: res.data };
  } catch (error) {
    return {
      status: 'error',
      message: error.response?.data?.message || 'Error updating chapter',
    };
  }
};
