import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import './SearchBarRotate.css';
import slugMap from '../data/dormSlugMap.json';

function SearchBarRotate({ customStyles = {} }) {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const getSlug = (id) => {
    const entry = slugMap.find((d) => d.id === id);
    return entry ? entry.slug : null;
    };
    
  const rotatingPlaceholders = [
    'Search "Burbank"',
    'Search "Casa Zapata"',
    'Search "Donner"',
    'Search "Larkin"',
    'Search "Sally Ride"',
    'Search "Twain"',
    // 'Search "Alondra"',
    // 'Search "Cardenal"',
    // 'Search "Faisan"',
    // 'Search "Gavilan"',
    // 'Search "Loro"',
    // 'Search "Mirlo"',
    // 'Search "Paloma"',
    'Search "Muwekma-Tah-Ruk"',
    'Search "Robert Moore North"',
    'Search "Arroyo"',
    'Search "Cedro"',
    'Search "Junipero"',
    'Search "Okada"',
    'Search "Otero"',
    'Search "Rinconada"',
    'Search "Soto"',
    'Search "Trancos"',
    'Search "Ginkgo"',
    'Search "Branner"',
    'Search "Crothers"',
    'Search "CroMem"',
    'Search "Toyon"',
    'Search "Meier/Naranja"',
    'Search "Norcliffe"',
    'Search "Adelfa"',
    'Search "Roble"',
    'Search "Ujamaa"',
    'Search "West Lag"',
    'Search "Castaño"',
    'Search "Duan"',
    'Search "Kimball"',
    'Search "Mirrielees"',
    'Search "Lantana"',
    'Search "Ng"',
    'Search "Adams"',
    'Search "East"',
    'Search "Murray"',
    'Search "Potter"',
    'Search "Robinson"',
    'Search "Schiff"',
    'Search "Suites"',
    'Search "Yost"',
    'Search "Columbae"',
    'Search "Terra"',
    'Search "680 Lomita"',
    'Search "Neptune"',
    'Search "Robert Moore South"',
    'Search "Roth"',
    'Search "Hammarskjöld"',
    'Search "Durand"',
    'Search "Alpha Phi/Kappa Kappa Gamma"',
    'Search "Storey"',
    'Search "The Warehaus"',
    'Search "Synergy"',
    'Search "576 Alvarado"',
    'Search "Grove"',
    'Search "Kairos"',
    'Search "Delta Delta Delta"',
    'Search "alpha Kappa Delta Phi/Chi Omega"',
    'Search "550 Lasuen"',
    'Search "Kappa Alpha"',
    'Search "Pluto"',
    'Search "Pi Beta Phi"',
    'Search "Narnia"',
    'Search "Jerry"',
    'Search "Toussaint Louverture"',
    'Search "Sigma Phi Epsilon"',
    'Search "Phi Kappa Psi"',
    'Search "Kappa Alpha Theta"',
    'Search "Sigma Nu"',
    'Search "Xanadu"',
    'Search "ZAP"',
    'Search "Kappa Sigma"',
    'Search "Mars"',
    'Search "Enchanted Broccoli Forest"'
  ];
  
  const [placeholderIndex, setPlaceholderIndex] = useState(() => 
    Math.floor(Math.random() * rotatingPlaceholders.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % rotatingPlaceholders.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const placeholderText = rotatingPlaceholders[placeholderIndex];

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await fetch(`${API_BASE_URL}/api/search-options`);
      const data = await response.json();
      const dormOptions = data.dorms.map((dorm) => ({ label: dorm, type: 'dorm' }));
      const neighborhoodOptions = data.neighborhoods.map((n) => ({ label: n, type: 'neighborhood' }));
      setOptions([...dormOptions, ...neighborhoodOptions]);
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    const lowercaseValue = value.toLowerCase();
    const filtered = options.filter((option) =>
      option.label.toLowerCase().startsWith(lowercaseValue)
    );
    setFilteredOptions(filtered.slice(0, 5));
    setShowDropdown(true);
  };

  const handleSelect = (option) => {
    if (option.type === 'neighborhood') {
      navigate(`/neighborhood/${option.label}`);
    } else {
      fetch(`${API_BASE_URL}/api/dorms`)
        .then((res) => res.json())
        .then((dorms) => {
          const foundDorm = dorms.find((d) => d.name.toLowerCase() === option.label.toLowerCase());
          if (foundDorm) {
            const slug = getSlug(foundDorm.dorm_id);
            if (slug) {
              navigate(`/${slug}`);
            }
          }
        });
    }
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <div ref={wrapperRef} className="search-rotate-wrapper" style={{ ...customStyles, position: 'relative' }}>
      <div className="search-rotate-box">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholderText}
          aria-label="Search"
        />
      </div>

      {showDropdown && query.length > 0 && filteredOptions.length > 0 && (
        <ul className="search-rotate-dropdown">
          {filteredOptions.map((option) => (
            <li key={option.label} onClick={() => handleSelect(option)}>
              {option.label} <span style={{ color: '#777' }}></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBarRotate;
