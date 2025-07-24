import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { submitContactUs } from '../../services/contactService'; // Adjust path
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <section id="contact" className="bg-[var(--color-background)] text-[var(--color-text)] py-20 px-4 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Contact Us</h2>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          We'd love to hear from you. Please fill out the form below and we'll get in touch as soon as possible.
        </p>
      </div>

      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left side - Google Map */}
        <div className="h-96 md:h-auto w-full">
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
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md p-3 bg-transparent text-[var(--color-text)] placeholder:text-gray-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md p-3 bg-transparent text-[var(--color-text)] placeholder:text-gray-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-md p-3 bg-transparent text-[var(--color-text)] placeholder:text-gray-500"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-md p-3 bg-transparent text-[var(--color-text)] placeholder:text-gray-500"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-opacity-80 transition-colors text-white font-semibold p-3 rounded-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </section>
  );
};

export default ContactUs;
