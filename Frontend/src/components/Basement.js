import React from 'react';
import './Concrete.css'; // reuse same CSS styling
import logo from '../assets/logo.png'; // adjust if your logo path differs

const Basement = () => {
  return (
    <div className="concrete-page">

      {/* logo area */}
      <div className="logo-wrap">
        <img src={logo} alt="Handyman Logo" className="company-logo" />
      </div>

      {/* hero band */}
      <div className="hero-band">
        <div className="container">
          <h1 className="hero-title">BASEMENT</h1>
          <p className="hero-sub">Unlock the Hidden Potential of Your Home.</p>
        </div>
      </div>
      <br />

      {/* main content (dark section) */}
      <section className="main-dark">
        <div className="container content-grid">

          {/* left column - text */}
          <div className="content-left">
            <h2>Transform Your Basement into a Functional Living Space</h2>
            <p>
              At <strong>Handyman!</strong>, we specialize in creating basements that are
              more than just storage areas. Whether you want a cozy entertainment hub,
              a guest suite, a gym, or simply a dry and safe storage space —
              we bring comfort and value beneath your home.
            </p>

            <h3>Why Choose Our Basement Services?</h3>
            <ul className="service-list">
              <li><strong>Complete Basement Finishing</strong> – From walls to flooring, we handle it all.</li>
              <li><strong>Waterproofing Solutions</strong> – Protect your space from leaks, moisture, and mold.</li>
              <li><strong>Custom Layouts</strong> – Designed to suit your lifestyle and preferences.</li>
              <li><strong>Insulation & Soundproofing</strong> – Keep it cozy and quiet year-round.</li>
              <li><strong>Stylish Flooring Options</strong> – Carpet, vinyl, laminate, or hybrid choices available.</li>
              <li><strong>Lighting & Electrical</strong> – Smart, safe, and modern installations.</li>
              <li><strong>Home Theater & Entertainment Zones</strong> – Perfect for family fun.</li>
              <li><strong>On-Time & On-Budget Delivery</strong> – Quality construction you can trust.</li>
            </ul>
          </div>

          {/* right column - images stacked */}
          <aside className="content-right">
            <img src="/images/base1.jpeg" alt="Basement work 1" className="side-image" />
            <br/>
            <img src="/images/base2.jpeg" alt="Basement work 2" className="side-image" />
          </aside>
        </div>
      </section>

      {/* CTA (white band) */}
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

export default Basement;
