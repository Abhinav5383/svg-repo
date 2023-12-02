import React, { useEffect, useState } from 'react';
import "./Cards.css";



const Card = ({ iconName, data, createToast, notificationTypes, popupIds, currPopup, setcurrPopup, setSelectedIcon }) => {


  const handleClick = (data) => {
    setcurrPopup(popupIds?.svgDetails);
    setSelectedIcon({
      iconName,
      data
    });
  }


  return (
    <div className={`card`} onClick={() => { handleClick(data) }}>
      <div className="card-icon" dangerouslySetInnerHTML={{ __html: data }}></div>

      <div className="card-name">{iconName?.replaceAll("-", " ")}</div>
    </div>
  )
}



const Cards = ({ page, setPage, pageSize, maxPages, setMaxPages, query, createToast, notificationTypes, popupIds, currPopup, setcurrPopup, selectedIcon, setSelectedIcon, isLoading, setIsLoading }) => {

  const [renderIconsList, setRenderIconsList] = useState();
  const [iconsLen, setIconsLen] = useState(0);


  useEffect(() => {

    (async () => {

      if (isLoading) return;
      await setIsLoading(true);

      try {

        fetch("/api/searchIcons", {
          method: "POST",
          body: JSON.stringify({
            query,
            page,
            pageSize
          })
        })
          .then(async (response) => {
            response = await response.json();
            return response;
          })
          .then((response) => {
            setRenderIconsList(response.icons);
            setMaxPages(response.maxPages);
            setIconsLen(response.currIcons);
            setIsLoading(false);
          })

      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }

    })()

  }, [query, page]);


  useEffect(() => {
    setPage(1);
  }, [query])


  return (
    <>

      <section className="adsbygoogle adsense ad_space"></section>
      <section className="adsbygoogle adsense ad_space"></section>
      <section className="adsbygoogle adsense ad_space"></section>
      <section className="adsbygoogle adsense ad_space"></section>

      <div className="title">{iconsLen} Icons</div>

      <section className='cards'>

        <div className="wrapper">

          {renderIconsList &&
            renderIconsList?.map((icon, i) => {

              return (
                <React.Fragment key={`${icon?.name}-${i}`
                }>
                  < Card
                    iconName={icon?.name}
                    data={icon?.data}
                    createToast={createToast}
                    notificationTypes={notificationTypes}
                    popupIds={popupIds}
                    currPopup={currPopup}
                    setcurrPopup={setcurrPopup}
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                  />
                </React.Fragment>
              )
            })
          }

        </div>
      </section >
    </>
  )
}

export default Cards