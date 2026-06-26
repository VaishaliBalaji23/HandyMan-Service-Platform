import React from 'react';
import './About.css';
import { FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="about-section" data-aos="fade-up">
      <div className="about-container">
        
        <h2 className="about-title">About Us</h2>
        <p className="about-text">
          Founded in 2016, our business was born out of a genuine passion for hands-on work and a commitment 
          to helping homeowners. We believe in offering fair, honest pricing—no inflated rates, no unnecessary upselling—
          just the quality service you need, done right. Whether it’s a small fix or a big project, you can feel safe and worry-free 
          knowing your home is in good hands. We take pride in our craftsmanship and treat every job as if it were our own.
        </p>

        <h2 className="about-title">Our Mission</h2>
        <p className="about-text">
          At Handyman Construction, our mission is to make home maintenance and repairs easy, reliable, and stress-free. 
          We believe in providing affordable, high-quality services that exceed expectations and leave our customers satisfied. 
          Our goal is to be the go-to handyman service for every home, ensuring peace of mind for every project we take on.
        </p>

        <h2 className="about-title">Our Values</h2>
        <ul className="about-values">
          <li><FaCheckCircle className="icon" /> <strong>Integrity: </strong>  Honest, transparent, and ethical in all interactions.</li>
          <li><FaCheckCircle className="icon" /> <strong>Quality: </strong>  High-quality, professional craftsmanship on every job.</li>
          <li><FaCheckCircle className="icon" /> <strong>Customer Satisfaction: </strong>  Happiness is our top priority.</li>
          <li><FaCheckCircle className="icon" /> <strong>Reliability: </strong>  On time, efficient, and lasting results.</li>
        </ul>
      </div>
    </section>
  );
};

export default About;
