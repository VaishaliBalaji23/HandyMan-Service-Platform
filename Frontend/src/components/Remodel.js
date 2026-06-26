import React from "react";
import "./Remodel.css"; 
import logo from "../assets/logo.png"; // adjust path if needed

const Remodel = () => {
  return (
    <div className="remodel-page">
      {/* logo */}
      <div className="logo-wrap">
        <img src={logo} alt="Handyman Logo" className="company-logo" />
      </div>

      {/* hero section */}
      <div className="hero-band">
        <div className="container">
          <h1 className="hero-title">REMODELING</h1>
          <p className="hero-sub">From Worn to Wow – Remodel with Confidence.</p>
        </div>
      </div>

      {/* main content */}
      <section className="main-dark">
        <div className="container content-grid">
          {/* left text */}
          <div className="content-left">
            <h2>Transform Your Space with Expert Remodeling</h2>
            <p>
              At <strong>Handyman!</strong>, we specialize in breathing new life
              into tired spaces. Whether you&apos;re upgrading a single room or
              transforming your entire home, our remodeling services combine
              expert craftsmanship, smart design, and premium materials to make
              your vision a reality.
            </p>

            <h3>Why Choose Our Remodeling Services?</h3>
            <ul className="service-list">
              <li><strong>Complete Home Renovations</strong> – Refresh your interiors with style and function.</li>
              <li><strong>Kitchen Remodeling</strong> – Modern layouts, custom cabinetry, countertops & more.</li>
              <li><strong>Bathroom Upgrades</strong> – Sleek fixtures, spa-like designs, and improved efficiency.</li>
              <li><strong>Living Room Makeovers</strong> – Open up your space with better lighting and flow.</li>
              <li><strong>Basement & Attic Conversions</strong> – Turn unused areas into valuable living space.</li>
              <li><strong>Wall & Floor Redesigns</strong> – Update your surfaces with stunning finishes.</li>
              <li><strong>Space Optimization</strong> – Smart storage and layout planning for everyday ease.</li>
              <li><strong>Reliable Project Management</strong> – Timely delivery, transparent pricing, and clean execution.</li>
            </ul>
          </div>

          {/* right images */}
          <aside className="content-right">
            <img src="/images/remodel1.jpeg" alt="Remodel work 1" className="side-image" />
            <br/>
            <img src="/images/remodel2.jpeg" alt="Remodel work 2" className="side-image" />
          </aside>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="container cta-container">
          <h2>
            <span className="cta-text">Ready to get started?</span>&nbsp;
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

export default Remodel;
