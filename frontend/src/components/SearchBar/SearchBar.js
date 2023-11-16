import React, { useState } from 'react';
import '../../styles/SearchBar.css'

const SearchBar = ({ users, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleInputChange = (event) => {
      const newSearchTerm = event.target.value;
      setSearchTerm(newSearchTerm);
      onSearch(newSearchTerm);
    };
  
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder=" "
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="placeholder-text">Search (By Full Name)</div>
      </div>
    );
  };
  
  export default SearchBar;