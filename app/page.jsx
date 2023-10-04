"use client";

import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import "./globals.css";



function App() {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(400);
  const [maxPages, setMaxPages] = useState();
  const [query, setQuery] = useState("");
  const [currPopup, setcurrPopup] = useState("");
  const [data, setData] = useState({ icons: [] });


  const popupIds = {
    svgDetails: "svgDetails"
  };

  const fetchIcons = async () => {

    fetch("/api/data/getdata", {
      method: "GET"
    })
      .then(async (response) => {
        response = await response.json();
        if (!response.ok) {
          return console.log("Error occured");
        }
        return response;
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message)
      })

  };

  useEffect(() => {
    try {
      let localIcons = JSON.parse(localStorage.getItem("icons"));
      if (!localIcons?.icons) {
        fetchIcons();
      }
      else {
        setData(localIcons);
      }

    } catch (error) {
      console.log(error.message);
    }

  }, [])



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
