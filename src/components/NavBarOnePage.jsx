import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import './Navbar.css';

const sections = ['home', 'about', 'directory', 'contact'];

function Navbar() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      for (let id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 100) {
          setActive(id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#home" className="navbar-logo">TreeDorms</a>
        <SearchBar customStyles={{ backgroundColor: '#2c2c2c', border: '1px solid #555' }} />
      </div>

      <div className="navbar-links">
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`navbar-link ${active === id ? 'active' : ''}`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
