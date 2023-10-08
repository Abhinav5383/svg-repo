import React, { useState } from 'react';
import "./Header.css";
import SearchIcon from '../../assets/SearchIcon';


const Header = ({ query, setQuery, isLoading  }) => {
  const [queryVal, setQueryVal] = useState("");
  let timeoutID;

  const handleKeyDown = (e) => {

    if (isLoading) return;

    if (timeoutID) clearTimeout(timeoutID);

    if (e.key === "Enter") {
      if (queryVal === query) { return; }
      setQuery(queryVal);
    }

    setTimeout(() => {
      if (e.target.value === "" || !e.target.value) {
        setQueryVal("");
        setQuery("");
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
            <div className="search-icon" onClick={() => { if (isLoading) return; setQuery(queryVal) }}>
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