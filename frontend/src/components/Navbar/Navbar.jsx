import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      <button className='nav-btn'>HOME</button>
      <button className='nav-btn'>CALENDAR</button>
      <button className='nav-btn'>ACCOUNT</button>
    </nav>
  );
}

export default Navbar;
