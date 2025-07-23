import axios from 'axios';
import { config } from './config';

export async function getTestimonials() {
  try {
    const url = `${config.serverUrl}/testimonials`; // Adjust endpoint if needed
    const response = await axios.get(url);

    // Add avatar image using name initials if image is not present
    const processedData = response.data.map((testimonial) => {
      return {
        ...testimonial,
        image: testimonial.image
          ? testimonial.image
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&color=fff&rounded=true&size=128`,
      };
    });

    return {
      status: 'success',
      data: processedData,
    };
  } catch (error) {
    console.error('Error fetching testimonials:', error.response?.data || error.message);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Something went wrong',
    };
  }
}
