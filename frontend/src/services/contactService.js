// services/contactService.js

import axios from 'axios';
import { config } from './config'; // adjust the path if needed

export async function submitContactUs(name, email, subject, message) {
  try {
    const contactUrl = `${config.serverUrl}/contactus`;

    const body = {
      name,
      email,
      subject,
      message,
    };

    const response = await axios.post(contactUrl, body);
    return {
      status: 'success',
      ...response.data,
    };
  } catch (error) {
    console.error('Contact form submission error:', error.response?.data || error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to send message',
    };
  }
}

export async function getAllContactUs() {
  try {
    const contactUrl = `${config.serverUrl}/contactus`; // Adjust if your endpoint is different

    const response = await axios.get(contactUrl);
    return {
      status: 'success',
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching contact messages:', error.response?.data || error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to fetch contact messages',
    };
  }
}