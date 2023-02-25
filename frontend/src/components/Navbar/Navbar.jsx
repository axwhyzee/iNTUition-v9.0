import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate()

  return (
    <nav className='navbar'>
    <button className='nav-btn' onClick={() => {navigate("/")}}>HOME</button>
    <button className='nav-btn' onClick={() => {navigate("/calendar")}}>CALENDAR</button>
    <button className='nav-btn'>ACCOUNT</button>
    <button className='nav-btn'>Login</button>
    <button className='nav-btn'>Signup</button>
    </nav>
    
  );
}

export default Navbar;
