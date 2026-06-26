import React from 'react';
import heroImage from '../assets/banner.png'; // Add a construction image here

const HeroSection = () => {
  return (
    <div style={{ position: 'width:90%' }}data-aos="fade-up">
      <img
        src={heroImage}
        alt="Hero"
        style={{ width: '100%', height: '750px' }}
      />
      
       
      
    </div>
  );
};

export default HeroSection;
