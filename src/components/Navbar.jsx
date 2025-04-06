import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="navbar-logo">
          CardinalDorms
        </NavLink>
        <SearchBar customStyles={{ backgroundColor: '#2c2c2c', border: '1px solid #555' }} />
      </div>

      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
        >
          About
        </NavLink>
        <NavLink
          to="/directory"
          className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
        >
          Directory
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
