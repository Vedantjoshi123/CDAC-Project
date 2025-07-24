import React from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-32 pt-20 pb-20 px-5 text-center space-y-6">
      <h1 className="text-3xl md:text-5xl font-semibold text-[var(--color-text)] max-w-3xl leading-snug">
        Learn at your own pace, from the best in the industry.
      </h1>

      <p className="text-[var(--color-text-secondary)] text-sm md:text-base max-w-xl">
        Access top-rated courses and grow your skills anytime, anywhere. Let your learning journey begin with LearnNow.
      </p>

      <SearchBar />
    </div>
  );
};

export default Hero;
