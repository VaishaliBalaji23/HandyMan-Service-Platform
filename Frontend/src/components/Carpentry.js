import React from 'react';
import './Carpentry.css';
import logo from '../assets/logo.png';

const Carpentry = () => {
  return (
    <div className="carpentry-page">

      {/* logo area */}
      <div className="logo-wrap">
        <img src={logo} alt="Handyman Logo" className="company-logo" />
      </div>

      {/* hero band */}
      <div className="hero-band">
        <div className="container">
          <h1 className="hero-title">CARPENTRY</h1>
          <p className="hero-sub">Craftsmanship You Can Trust, Woodwork That Lasts</p>
        </div>
      </div>

      <br />

      {/* main content */}
      <section className="main-dark">
        <div className="container content-grid">

          {/* left column */}
          <div className="content-left">
            <h2>Built to Perfection, Designed for You</h2>
            <p>
              At <strong>Handyman</strong>, our expert carpentry services bring your vision to life with precision and
              durability. Whether you need custom cabinets, detailed wood trims, or strong wooden structures, 
              we combine skilled craftsmanship with the best materials to ensure every project is functional 
              and beautiful.
            </p>

            <h3>Why Choose Our Carpentry Services?</h3>
            <ul className="service-list">
              <li><strong>Custom Cabinets & Furniture</strong> – Tailored woodwork for your home or office</li>
              <li><strong>Door & Window Frames</strong> – Strong, reliable, and perfectly aligned installations</li>
              <li><strong>Decks & Pergolas</strong> – Enhance your outdoors with stylish wood structures</li>
              <li><strong>Trim & Molding</strong> – Add elegance with detailed wood finishing</li>
              <li><strong>Repair & Restoration</strong> – Restore old wooden furniture and fixtures</li>
              <li><strong>Premium Materials</strong> – We use only durable and sustainable wood</li>
            </ul>
          </div>

          {/* right column */}
          <aside className="content-right">
            <img src="/images/carp1.jpg" alt="Carpentry work example 1" className="side-image" />
            <br/>
            <img src="/images/carp2.jpg" alt="Carpentry work example 2" className="side-image" />
          </aside>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="container cta-container">
          <h2>
            <span className="cta-text">Raedy to get started?</span>
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

export default Carpentry;
