import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { testimonialService } from '../../services/testimonialService';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

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
    <div className="px-6 md:px-12 pt-20 pb-24">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-text)]">
          Testimonials
        </h2>
        <p className="mt-4 text-sm md:text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Hear from our learners as they share their journeys of transformation, success, 
          and how our platform has made a difference in their lives.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm text-left border border-[var(--color-border)]
              rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
              shadow-[0px_4px_15px_0px] shadow-black/10 overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
          >
            {/* Top - Name & Avatar */}
            <div className="flex items-center gap-4 px-5 py-4 bg-[var(--color-bg-alt)] dark:bg-[var(--color-bg-darker)]">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-medium text-[var(--color-text)]">{testimonial.name}</h1>
                <p className="text-[var(--color-text-secondary)] text-sm">{testimonial.role}</p>
              </div>
            </div>

            {/* Feedback */}
            <div className="p-5">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="h-5"
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-[var(--color-text-secondary)] mt-4">
                {testimonial.feedback}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
