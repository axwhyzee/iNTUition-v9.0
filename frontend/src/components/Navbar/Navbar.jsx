import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      <button className='nav-btn'>HOME</button>
      <button className='nav-btn'>CALENDAR</button>
      <button className='nav-btn'>ACCOUNT</button>
      <Link to="/login"><button className='nav-btn'>Login</button></Link>
      <Link to="/signup"><button className='nav-btn'>Signup</button></Link>
    </nav>
  );
}

export default Navbar;
