import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Navbar.css';
import colors from '../styles/colors';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      {/* Left section: Logo and search (visible on larger screens) */}
      <div className="navbar-left">
      <NavLink to="/" className="navbar-logo" style={{ color: colors.white }}>
          TreeDorms
        </NavLink>

        {/* Shown only on medium+ screens */}
        <div className="search-desktop">
          <SearchBar
            customStyles={{
              backgroundColor: '#2c2c2c',
              border: '1px solid #555',
            }}
          />
        </div>
      </div>

      {/* Hamburger toggle button */}
      <button className="navbar-toggle" onClick={toggleMenu}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Dropdown menu (visible when toggled on small screens) */}
      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {/* SearchBar shown only on small screens inside dropdown */}
        <div className="search-mobile">
          <SearchBar
            customStyles={{
              backgroundColor: '#2c2c2c',
              border: '1px solid #555',
              width: '100%',
            }}
          />
        </div>

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
