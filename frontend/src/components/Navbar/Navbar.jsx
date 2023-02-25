import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      <button className='nav-btn'>HOME</button>
      <button className='nav-btn'>CALENDAR</button>
      <button className='nav-btn'>ACCOUNT</button>
      <button className='nav-btn'>Login</button>
      <button className='nav-btn'>Signup</button>
    </nav>
  );
}

export default Navbar;
