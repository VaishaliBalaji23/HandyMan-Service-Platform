import React from 'react';
import logo from '../assets/logo.png'; // ✅ correct


const Header = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <img src={logo} alt="Company Logo" style={{ height: '200px',marginBottom:'5px'}} />
      <h1 style={{ fontWeight: 'bold', color: '#3366cc',marginTop:'0' }}>
        FIX IT RIGHT, FIX IT NOW!
      </h1>
    </div>
  );
};

export default Header;
