import React, { useEffect, useState } from 'react';
import "./Header.css";
import SearchIcon from '../../assets/SearchIcon';


const Header = ({ setQuery }) => {
  let timeoutId;

  const handleKeyDown = (e) => {

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setQuery(e.target.value.replace(/\s/g, ''));
    }, 800);
  }


  return (
    <header>
      <nav>

        <div className="wrapper">

          <div className="links">
            <div className="brand">My&nbsp;Icons</div>
          </div>

          <div className="search-box">
            <div className="search-icon">
              < SearchIcon />
            </div>
            <input type="text" name="icons-search" id='icons-search' placeholder='Search Icons' onKeyDown={handleKeyDown} />
          </div>

        </div>

      </nav>
    </header>
  )
}

export default Header