// services/feedbackService.js

import axios from 'axios';
import { config } from './config';

// Get feedback list for a course
export async function getFeedback(courseId) {
  try {
    const url = `${config.serverUrl}/feedbacks/course/${courseId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
}

// Add new feedback for a course
export async function addFeedback(courseId, feedbackData) {
  if (!courseId || !feedbackData || !feedbackData.comment || !feedbackData.rating) {
    throw new Error("Invalid feedback data");
  }

  try {
    const url = `${config.serverUrl}/feedbacks`;
    const response = await axios.post(url, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
}
