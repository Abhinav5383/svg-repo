"use client";

import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import "./globals.css";



function App() {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(400);
  const [maxPages, setMaxPages] = useState(1);
  const [query, setQuery] = useState("");
  const [currPopup, setcurrPopup] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const popupIds = {
    svgDetails: "svgDetails"
  };


  return (
    <div id="app">
      < Header
        setQuery={setQuery}
      />

      < Main
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxPages={maxPages}
        setMaxPages={setMaxPages}
        query={query}
        setQuery={setQuery}
        popupIds={popupIds}
        currPopup={currPopup}
        setcurrPopup={setcurrPopup}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  )
}

export default App;
