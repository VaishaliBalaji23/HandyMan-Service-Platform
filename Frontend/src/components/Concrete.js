import React from 'react';
import './Concrete.css';
import logo from '../assets/logo.png'; // adjust if your logo path differs

const ConcreteService = () => {
  return (
    <div className="concrete-page">

      {/* logo area (white background above hero band) */}
      <div className="logo-wrap">
        <img src={logo} alt="Handyman Logo" className="company-logo" />
      </div>

      {/* hero band */}
      <div className="hero-band">
        <div className="container">
          <h1 className="hero-title">CONCRETE / MASONRY</h1>
          <p className="hero-sub">Durable. Reliable. Built to Last.</p>
        </div>
      </div>
<br/>
      {/* main content (dark section) */}
      <section className="main-dark">
        <div className="container content-grid">

          {/* left column - text */}
          <div className="content-left">
            <h2>Concrete & Masonry Services</h2>
            <p>
              Concrete is the foundation—literally—of most residential and commercial construction. At
              <strong> Handyman</strong>, we offer precision concrete work designed to withstand heavy use, extreme weather, and the test of time. Whether you're pouring a new driveway, repairing cracked surfaces, or installing a decorative concrete patio, our expert craftsmanship ensures safety, functionality, and lasting beauty.
            </p>

            <h3>Types of Concrete Work We Offer:</h3>
            <ul className="service-list">
              <li><strong>New Concrete Installation</strong> – Sidewalks, driveways, patios, floors, and more</li>
              <li><strong>Concrete Repair</strong> – Crack filling, patching, joint sealing, and surface restoration</li>
              <li><strong>Stamped & Decorative Concrete</strong> – Custom textures, patterns, and colors</li>
              <li><strong>Concrete Slabs</strong> – Garages, sheds, decks, home additions</li>
              <li><strong>Foundation Work</strong> – Pouring, reinforcement, waterproofing</li>
            </ul>
          </div>

          {/* right column - images stacked */}
          <aside className="content-right">
            {/* replace these paths with your actual images inside public/images */}
            <img src="/images/concrete1.jpeg" alt="Concrete work 1" className="side-image" />
            <img src="/images/concrete2.jpg" alt="Concrete work 2" className="side-image" />
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

      {/* footer (dark) */}
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

export default ConcreteService;
