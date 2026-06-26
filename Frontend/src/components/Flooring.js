import React from 'react';
import './Concrete.css'; // ✅ Reuse the same CSS styling
import logo from '../assets/logo.png'; // ✅ Adjust if path differs

const Flooring = () => {
  return (
    <div className="concrete-page">
      {/* logo area */}
      <div className="logo-wrap">
        <img src={logo} alt="Handyman Logo" className="company-logo" />
      </div>

      {/* hero band */}
      <div className="hero-band">
        <div className="container">
          <h1 className="hero-title">FLOORING</h1>
          <p className="hero-sub">Step into Style and Strength with Our Expert Flooring Solutions.</p>
        </div>
      </div>
      <br />

      {/* main content (dark section) */}
      <section className="main-dark">
        <div className="container content-grid">
          {/* left column - text */}
          <div className="content-left">
            <h2>Transform Every Step You Take</h2>
            <p>
              At <strong>Handyman!</strong>, we specialize in creating floors that combine durability,
              beauty, and functionality. Whether it’s elegant wooden flooring for your living room
              or sleek tiles for your kitchen, we ensure perfection beneath your feet.
            </p>

            <h3>Why Choose Our Flooring Services?</h3>
            <ul className="service-list">
              <li><strong>Wide Range of Materials</strong> – From hardwood and vinyl to marble and laminate.</li>
              <li><strong>Precision Installation</strong> – Expertly laid floors with smooth finishing and perfect alignment.</li>
              <li><strong>Moisture & Stain Resistance</strong> – Long-lasting protection for busy spaces.</li>
              <li><strong>Low Maintenance Options</strong> – Easy to clean and made to last for years.</li>
              <li><strong>Custom Designs</strong> – Choose textures, colors, and patterns that reflect your taste.</li>
              <li><strong>Eco-Friendly Choices</strong> – Sustainable materials for an environmentally conscious home.</li>
              <li><strong>Affordable Excellence</strong> – Premium finish without stretching your budget.</li>
              <li><strong>Quick & Hassle-Free Installation</strong> – We value your time and comfort.</li>
            </ul>
          </div>

          {/* right column - images stacked */}
          <aside className="content-right">
            <img src="/images/floor1.jpeg" alt="Flooring work 1" className="side-image" />
            <br />
            <img src="/images/floor2.jpg" alt="Flooring work 2" className="side-image" />
          </aside>
        </div>
      </section>

      {/* CTA (white band) */}
      <div className="cta-band">
        <div className="container cta-container">
          <h2>
            <span className="cta-text">Want to upgrade your floors?</span>
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

export default Flooring;
