

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { submitContactUs } from '../../services/contactService'; // adjust path
import 'react-toastify/dist/ReactToastify.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      toast.error('All fields are required');
      return;
    }

    const response = await submitContactUs(name, email, subject, message);

    if (response.status === 'success') {
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">

        {/* Left side - College Location */}
        <div className="w-full md:w-1/2 h-96 md:h-auto">
          <iframe
            title="Sunbeam Infotech Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.5562448446467!2d73.70315507519335!3d18.588904682517903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb7d0345f01f%3A0x6e8c20c647a06f47!2sSunbeam%20Infotech%20Private%20Limited!5e1!3m2!1sen!2sin!4v1753352527515!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Right side - Contact Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-[var(--color-text)] mb-6 text-center">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md p-3 text-[var(--color-text)] placeholder:text-gray-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md p-3 text-[var(--color-text)] placeholder:text-gray-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-md p-3 text-[var(--color-text)] placeholder:text-gray-400"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-md p-3 text-[var(--color-text)] placeholder:text-gray-400"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] text-white p-3 rounded-md hover:bg-[#005B3B] transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default ContactUs;
