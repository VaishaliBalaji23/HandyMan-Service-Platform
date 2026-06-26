import React from 'react';
import './Pavers.css';
import logo from '../assets/logo.png';

const Pavers = () => {
  return (
    <div className="pavers-page">

      {/* logo area */}
      <div className="logo-wrap">
        <img src={logo} alt="Handyman Logo" className="company-logo" />
      </div>

      {/* hero band */}
      <div className="hero-band">
        <div className="container">
          <h1 className="hero-title">PAVERS / PATIOS</h1>
          <p className="hero-sub">From Plain to Perfect – One Paver at a Time!</p>
        </div>
      </div>

      <br />

      {/* main content */}
      <section className="main-dark">
        <div className="container content-grid">

          {/* left column */}
          <div className="content-left">
            <h2>Enhance Your Outdoor Living with Style and Strength</h2>
            <p>
              At <strong>Handyman</strong>, we bring your outdoor spaces to life with custom-designed paver and patio installations.
              Whether you dream of a cozy backyard retreat, a stylish entertainment area, or a sleek, low-maintenance walkway,
              we build it with precision, quality materials, and a commitment to long-lasting beauty.
              From modern geometric patterns to rustic natural stone finishes, our expert craftsmen help you transform any outdoor
              space into a functional and beautiful extension of your home.
            </p>

            <h3>Why Choose Our Paver & Patio Services?</h3>
            <ul className="service-list">
              <li><strong>Custom Designs</strong> – Tailored to your home’s aesthetic and your personal lifestyle</li>
              <li><strong>Durable Materials</strong> – Choose from high-quality concrete, brick, or natural stone pavers</li>
              <li><strong>Expert Installation</strong> – We ensure a solid base, perfect alignment, and professional finishing</li>
              <li><strong>Low Maintenance</strong> – Enjoy lasting beauty with easy upkeep and minimal repairs</li>
              <li><strong>Weather Resistant</strong> – Designed to withstand heat, rain, and daily wear</li>
              <li><strong>Increased Property Value</strong> – Boost curb appeal and resale value with elegant outdoor upgrades</li>
            </ul>
          </div>

          {/* right column */}
          <aside className="content-right">
            <img src="/images/pavers1.jpg" alt="Paver patio example 1" className="side-image" />
            <br/>
            <img src="/images/pavers2.jpg" alt="Paver patio example 2" className="side-image" />
          </aside>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="container cta-container">
          <h2>
            <span className="cta-text">Ready to get started?</span>
            &nbsp;
            <a className="cta-link" href="/booknow">Book Now!</a>
          </h2>
        </div>
      </div>

      {/* footer */}
      <footer className="service-footer">
        <div className="container footer-container">
          <h4>Contact Us</h4>
          <p>Email: info@yourhandyman.com</p>
          <p>Phone: 862-300-5256</p>
          <p>Address: Coimbatore, India</p>
        </div>
      </footer>

    </div>
  );
};

export default Pavers;
