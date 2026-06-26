import React from 'react';
import './Concrete.css'; // reuse same CSS styling
import logo from '../assets/logo.png'; // adjust if your logo path differs

const Decks = () => {
  return (
    <div className="concrete-page">

      {/* logo area */}
      <div className="logo-wrap">
        <img src={logo} alt="Handyman Logo" className="company-logo" />
      </div>

      {/* hero band */}
      <div className="hero-band">
        <div className="container">
          <h1 className="hero-title">DECKS</h1>
          <p className="hero-sub">Build the Perfect Escape – Right at Home.</p>
        </div>
      </div>
      <br />

      {/* main content (dark section) */}
      <section className="main-dark">
        <div className="container content-grid">

          {/* left column - text */}
          <div className="content-left">
            <h2>Breathe New Life into Your Outdoors</h2>
            <p>
              At <strong>Handyman!</strong>, we turn open spaces into elegant escapes.
              Whether you dream of a cozy corner for your morning coffee or a grand deck for entertaining guests,
              our expert craftsmanship brings your outdoor vision to life.
            </p>

            <h3>Why Choose Our Deck & Pergola Services?</h3>
            <ul className="service-list">
              <li><strong>Custom-Built Designs</strong> – Tailored to your space, lifestyle, and taste.</li>
              <li><strong>Weather-Resistant Materials</strong> – Built tough to handle sun, rain, and time.</li>
              <li><strong>Elegant Pergolas</strong> – Add charm and shade with architectural beauty.</li>
              <li><strong>Functional Decking</strong> – Strong, level surfaces perfect for gatherings.</li>
              <li><strong>Low Maintenance Options</strong> – Choose from wood, composite, or hybrid solutions.</li>
              <li><strong>Lighting & Accessories</strong> – Enhance evenings with smart finishing touches.</li>
              <li><strong>Fast, Reliable Installation</strong> – On time. On budget. On point.</li>
              <li><strong>Safety First</strong> – Sturdy railings, slip-resistant materials, and solid foundations.</li>
            </ul>
          </div>

          {/* right column - images stacked */}
          <aside className="content-right">
            <img src="/images/decks1.jpeg" alt="Deck work 1" className="side-image" />
            <br/>
            <img src="/images/decks2.jpeg" alt="Deck work 2" className="side-image" />
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

export default Decks;
