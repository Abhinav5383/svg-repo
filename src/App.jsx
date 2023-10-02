import { useState } from "react";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import "./globals.css";

import data from "./data";



function App() {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(400);
  const [maxPages, setMaxPages] = useState();
  const [query, setQuery] = useState("");
  const [currPopup, setcurrPopup] = useState("");


  const popupIds = {
    svgDetails: "svgDetails"
  }


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
        data={data}
        popupIds={popupIds}
        currPopup={currPopup}
        setcurrPopup={setcurrPopup}
      />
    </div>
  )
}

export default App;
