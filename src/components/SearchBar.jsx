// SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import './SearchBar.css';
import slugMap from '../data/dormSlugMap.json';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const getSlug = (id) => {
  const entry = slugMap.find((d) => d.id === id);
  return entry ? entry.slug : null;
  };

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
    <div className="searchbox-wrapper" ref={wrapperRef}>
      <div className="searchbox">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 
          5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 
          4.99L20.49 19l-4.99-5zm-6 
          0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 
          9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          type="search"
          placeholder="Search for a dorm"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {showDropdown && query.length > 0 && filteredOptions.length > 0 && (
        <ul className="search-dropdown">
          {filteredOptions.map((option) => (
            <li key={option.label} onClick={() => handleSelect(option)}>
              {option.label} <span className="type"></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
