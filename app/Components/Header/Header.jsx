import React, { useState } from 'react';
import "./Header.css";
import SearchIcon from '../../assets/SearchIcon';


const Header = ({ query, setQuery, isLoading, setPage }) => {
  const [queryVal, setQueryVal] = useState("");
  let timeoutID;

  const handleKeyDown = (e) => {

    if (isLoading) return;

    if (timeoutID) clearTimeout(timeoutID);

    if (e.key === "Enter") {
      if (queryVal === query) { return; }
      setQuery(queryVal);
      setPage(1);
    }

    setTimeout(() => {
      if (e.target.value === "" || !e.target.value) {
        setQueryVal("");
        setQuery("");
        setPage(1);
      }
    }, 500);
  }


  return (
    <header>
      <nav>

        <div className="wrapper">

          <div className="links">
            <div className="brand">My&nbsp;Icons</div>
          </div>

          <div className="search-box">
            <div className="search-icon" onClick={() => { if (isLoading) return; setQuery(queryVal); setPage(1) }}>
              < SearchIcon />
            </div>

            <input
              type="text"
              name="icons-search"
              id='icons-search'
              placeholder='Search Icons'
              value={queryVal}
              onChange={(e) => { setQueryVal(e.target.value) }}
              onKeyDown={handleKeyDown}
            />

          </div>

        </div>

      </nav>
    </header>
  )
}

export default Header