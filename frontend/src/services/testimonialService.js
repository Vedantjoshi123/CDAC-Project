import axios from 'axios';
import { config } from './config';

const baseUrl = `${config.serverUrl}/testimonials`;

export const testimonialService = {
  async getTestimonials() {
    try {
      const response = await axios.get(baseUrl);

      // Enhance testimonials with avatar image (if not present)
      const processedData = response.data.map((testimonial) => ({
        ...testimonial,
        image: testimonial.image
          ? testimonial.image
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&color=fff&rounded=true&size=128`,
      }));

      return processedData;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  async addTestimonial(data) {
    try {
      const response = await axios.post(baseUrl, data);
      return response.data;
    } catch (error) {
      console.error('Error adding testimonial:', error);
      throw error;
    }
  },
  async updateTestimonial(id, data) {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing testimonial:', error);
    throw error;
  }
},

async deleteTestimonial(id) {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
}

  
};
