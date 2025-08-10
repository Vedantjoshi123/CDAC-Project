// src/services/purchaseService.js
import axios from 'axios';
import { config } from './config';

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Enroll a student in a course.
 * Sends JSON body { studentId, courseId, amountPaid? } to backend.
 */
export async function enrollCourse(studentId, courseId, amountPaid = null) {
  if (!studentId || !courseId) throw new Error('Student ID and Course ID are required');

  try {
    const url = `${config.serverUrl}/purchases/enroll`;
    const body = { studentId: Number(studentId), courseId: Number(courseId) };
    if (amountPaid != null) body.amountPaid = amountPaid;

    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    });

    // return normalized object
    return { status: 'success', data: response.data };
  } catch (error) {
    console.error('Enroll course error:', error.response?.data || error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || (error.message || 'Failed to enroll course'),
      raw: error.response?.data || null,
    };
  }
}

/**
 * Check if user is enrolled. Backend returns { enrolled: true/false }.
 */
export async function checkEnrollment(studentId, courseId) {
  if (!studentId || !courseId) throw new Error('Student ID and Course ID are required');

  try {
    const url = `${config.serverUrl}/purchases/check`;
    const response = await axios.get(url, {
      params: { userId: Number(studentId), courseId: Number(courseId) },
      headers: { ...authHeader() },
    });
    return Boolean(response.data?.enrolled);
  } catch (error) {
    console.error('Check enrollment error:', error.response?.data || error.message);
    return false;
  }
}
