import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
       <div className="map-container">
            <iframe
              title="Handyman Location - Coimbatore"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.723478536727!2d76.95583261533486!3d11.016844392157736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857e0b6a51d13%3A0x94f8b6f68d4bfb0!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1702898650000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
      <div className="footer-container">
        {/* Left Branding */}
        <div className="footer-left">
         
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="/footer">Contact</a></li>
          </ul>
        </div>

        {/* Contact + Google Map */}
        <div className="footer-contact">
          <h4>Contact</h4>
         <p>
  Email: <a href="mailto:handymanservices380@gmail.com">handymanservices380@gmail.com</a>
</p>

          <p>Phone: +91 7904338121</p>

          {/* Embedded Google Map */}
         
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Handyman Construction. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
