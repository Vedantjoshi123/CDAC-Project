import React, { useState, useEffect } from 'react';

const Rating = ({ initialRating = 0, onChange = () => {}, readonly = false }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (value) => {
    if (!readonly) {
      setRating(value);
      onChange(value); // ✅ IMPORTANT: Notifies Player.jsx
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (!readonly) setHoverRating(0);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor: readonly ? 'default' : 'pointer',
            color: value <= (hoverRating || rating) ? 'gold' : 'gray',
            fontSize: '1.5rem',
            userSelect: 'none',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
