import React from 'react';
import './Retain.css';
import logo from '../assets/logo.png';

const Retain = () => {
  return (
    <div className="retainwall-page">

      {/* logo area */}
      <div className="logo-wrap">
        <img src={logo} alt="Handyman Logo" className="company-logo" />
      </div>

      {/* hero band */}
      <div className="hero-band">
        <div className="container">
          <h1 className="hero-title">RETAIN WALLS</h1>
          <p className="hero-sub">Built to Support. Designed to Impress.</p>
      
        </div>
      </div>

      <br />

      {/* main content */}
      <section className="main-dark">
        <div className="container content-grid">

          {/* left column */}
          <div className="content-left">
            <p>
              At <strong>Handyman</strong>, we don’t just build retaining walls — we craft lasting structures that combine
              strength, stability, and style. Whether you’re holding back a hillside, elevating a garden, or adding definition to your yard,
              our walls are tailored to serve both function and form. We use only the best materials and time-tested techniques to ensure
              your investment stands the test of time — and looks great doing it.
            </p>

            <h3>What We Offer:</h3>
            <ul className="service-list">
              <li><strong>Sloped Yard Solutions</strong> – Level areas for gardening, patios, or play</li>
              <li><strong>Multi-Tiered Walls</strong> – Add depth and maximize your space</li>
              <li><strong>Integrated Features</strong> – Lighting, planters, or seating built-in</li>
              <li><strong>Custom Materials</strong> – Natural stone, timber, brick, or eco-friendly blocks</li>
              <li><strong>Drainage Engineering</strong> – Smart systems for long-lasting support</li>
              <li><strong>Structural Garden Beds</strong> – Beautiful raised planters that double as retaining walls</li>
              <li><strong>Stair Integration</strong> – Seamlessly combine steps with retaining walls for elevated access and style</li>
            </ul>
          </div>

          {/* right column */}
          <aside className="content-right">
            <img src="/images/retain1.jpg" alt="Retaining wall example 1" className="side-image" />
            <img src="/images/retain2.jpg" alt="Retaining wall example 2" className="side-image" />
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

export default Retain;
