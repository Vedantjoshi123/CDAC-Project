import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { testimonialService } from '../../services/testimonialService';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      const data = await testimonialService.getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error.message);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="pb-14 px-8 md:px-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-medium text-[var(--color-text)]">Testimonials</h2>

        {/* Add New Testimonial Button (Optional) */}
        {/* 
        <button
          onClick={handleAddTestimonial} // Implement this function to open a modal
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
        >
          + Add Testimonial
        </button> 
        */}
      </div>

      <p className="md:text-base text-[var(--color-text-secondary)] mt-3">
        Hear from our learners as they share their journeys of transformation, success, and how our <br />
        platform has made a difference in their lives.
      </p>

      <div className="grid grid-cols-auto gap-8 mt-14">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm text-left border border-[var(--color-border)]
              pb-6 rounded-lg bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
              shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 px-5 py-4 bg-[var(--color-bg-alt)] dark:bg-[var(--color-bg-darker)]">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-medium text-[var(--color-text)]">{testimonial.name}</h1>
                <p className="text-[var(--color-text-secondary)]">{testimonial.role}</p>
              </div>
            </div>

            {/* Rating and Feedback */}
            <div className="p-5 pb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5"
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt=""
                  />
                ))}
              </div>
              <p className="text-[var(--color-text-secondary)] mt-5">{testimonial.feedback}</p>
            </div>

            {/* Read More */}
            <a
              href="#"
              className="text-[var(--color-primary)] underline px-5 hover:opacity-90 transition-opacity duration-300"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
