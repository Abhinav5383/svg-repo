import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import "./Main.css";
import BackwardIcon from '../../assets/BackwardIcon';
import ForwardIcon from '../../assets/ForwardIcon';
import { Check } from '../../assets/Check';
import Details from './PopUp/Details';
import Loading from "../../assets/Loading";


const Main = ({ page, setPage, pageSize, setPageSize, maxPages, setMaxPages, query, setQuery, popupIds, currPopup, setcurrPopup, isLoading, setIsLoading }) => {

  let timeoutId;

  const notificationTypes = {
    success: "success",
    warning: "warning",
    error: "error"
  }

  const icons = {
    success: < Check />
  }

  const [toastList, setToastList] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState({});

  const createToast = (title, type) => {
    let newToast = {
      title: title,
      type: type
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setToastList([]);

    setTimeout(() => {
      setToastList([newToast]);
    }, 200);


    timeoutId = setTimeout(() => {
      setToastList([]);
    }, 6000);

  }


  const pageForward = (count = 1) => {
    if (page + count <= Math.ceil(maxPages)) {
      setPage(page + count);
    }
    else if (page + count > Math.ceil(maxPages)) {
      setPage(Math.ceil(maxPages));
    }

  }

  const pageBackward = (count = 1) => {
    if (page - count < 1) {
      // Do nothing
      setPage(1);
    }
    else if (page - count >= 1) {
      setPage(page - count);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      pageBackward(1);
    }
    else if (e.key === "ArrowRight") {
      pageForward(1);
    }
  }


  useEffect(() => {
    document.querySelector("main").focus();
  }, [])



  return (
    <main tabIndex={1} onKeyDown={handleKeyDown} className={`${isLoading ? "loading" : ""}`}>
      <div className="main-content" >

        <div className="cards-wrapper">
          < Cards
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            maxPages={maxPages}
            setMaxPages={setMaxPages}
            query={query}
            setQuery={setQuery}

            createToast={createToast}
            notificationTypes={notificationTypes}

            popupIds={popupIds}
            currPopup={currPopup}
            setcurrPopup={setcurrPopup}

            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}

            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>

        {
          <div className="pagination">
            <div className="pageination-buttons">

              <div className="buttons">
                <div className={`start btn dbl-btn ${page === 1 ? "disabled" : ""}`} onClick={() => { pageBackward(page - 1) }}>
                  < BackwardIcon />
                  < BackwardIcon />
                </div>
                <div className={`back btn ${page === 1 ? "disabled" : ""}`} onClick={() => { pageBackward(1) }}>
                  < BackwardIcon />
                </div>
              </div>

              <div className="buttons">
                <div className="page btn">{page}</div>
              </div>

              <div className="buttons">
                <div className={`next btn ${page == maxPages ? "disabled" : ""}`} onClick={() => { pageForward(1) }}>
                  < ForwardIcon />
                </div>
                <div className={`end btn dbl-btn ${page == maxPages ? "disabled" : ""}`} onClick={() => { pageForward(Math.ceil(maxPages) - page) }}>
                  < ForwardIcon />
                  < ForwardIcon />
                </div>
              </div>

            </div>
          </div>
        }
      </div>

      {
        currPopup === popupIds.svgDetails &&

        < Details
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          popupIds={popupIds}
          currPopup={currPopup}
          setcurrPopup={setcurrPopup}
          notificationTypes={notificationTypes}
          createToast={createToast}
        />
      }

      <div className="toast-notifications">
        <div className="notification-wrapper">
          {
            toastList &&
            toastList.map((toast, i) => (
              <div className={`toast ${toast.type}`} key={`${toast.title}-${i}`}>
                <div className="icon">{icons.success}</div>
                <div className="title">{toast.title}</div>
              </div>
            ))
          }
        </div>
      </div>


      {
        isLoading &&
        < Loading />
      }

    </main>
  )
}

export default Main