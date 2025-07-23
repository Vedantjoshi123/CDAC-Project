// src/api/testimonial.js
import axios from 'axios';

export const getTestimonials = async () => {
  try {
    const response = await axios.get('http://localhost:8080/feedbacks');
    return { status: 'success', data: response.data };
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};
