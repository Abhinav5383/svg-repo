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



const Cards = ({ page, setPage, pageSize, maxPages, setMaxPages, query, createToast, notificationTypes, data, popupIds, currPopup, setcurrPopup, selectedIcon, setSelectedIcon }) => {

  const [renderIconsList, setRenderIconsList] = useState();



  // Define a TrieNode class
  class TrieNode {
    constructor() {
      this.children = new Map();
      this.icons = [];
    }
  }

  // Insert an icon into the Trie
  function insertIcon(root, icon) {
    const name = icon?.name?.toLowerCase();
    const tags = icon?.tags?.toLowerCase();
    let node = root;

    for (const char of name) {
      if (!node?.children?.has(char)) {
        node?.children?.set(char, new TrieNode());
      }
      node = node?.children?.get(char);
      node?.icons?.push(icon);
    }

    // Add the icon to the Trie using tags as well
    for (const tag of tags?.split(' ')) {
      node = root;
      for (const char of tag) {
        if (!node?.children?.has(char)) {
          node?.children?.set(char, new TrieNode());
        }
        node = node?.children?.get(char);
        node?.icons?.push(icon);
      }
    }
  }

  // Search for icons matching the query using Trie
  function searchIcons(root, query) {
    const queryLower = query?.toLowerCase();
    const matchingIcons = new Set();

    let node = root;

    for (const char of queryLower) {
      if (node?.children?.has(char)) {
        node = node?.children?.get(char);
      } else {
        return [...matchingIcons]; // No matching icons for this query
      }
    }

    function traverse(node) {
      node?.icons?.forEach(icon => matchingIcons?.add(icon));
      for (const [char, childNode] of node?.children) {
        traverse(childNode);
      }
    }

    traverse(node);

    return [...matchingIcons];
  }

  // Custom sorting function based on relevancy criteria
  function customSort(a, b, query) {
    const queryLower = query?.toLowerCase();
    const nameLowerA = a?.name?.toLowerCase();
    const nameLowerB = b?.name?.toLowerCase();
    const tagsLowerA = a?.tags?.toLowerCase();
    const tagsLowerB = b?.tags?.toLowerCase();

    // Relevance score calculation
    let scoreA = 0;
    let scoreB = 0;

    // Priority 1: Exact Match at the Start of Name or Tags
    if (nameLowerA?.startsWith(queryLower) || tagsLowerA?.startsWith(queryLower)) {
      if (nameLowerA?.startsWith(queryLower)) {
        scoreA += 15
      }
      else {
        scoreA += 7
      }
    }
    if (nameLowerB?.startsWith(queryLower) || tagsLowerB?.startsWith(queryLower)) {
      scoreB += 10;
      if (nameLowerB?.startsWith(queryLower)) {
        scoreB += 15
      }
      else {
        scoreB += 7
      }
    }

    // Priority 2: Exact Match in Name or Tags
    if (nameLowerA?.includes(queryLower) || tagsLowerA?.includes(queryLower)) {
      if (nameLowerA?.includes(queryLower)) {
        scoreA += 10
      }
      else {
        scoreA += 7
      }
    }
    if (nameLowerB?.includes(queryLower) || tagsLowerB?.includes(queryLower)) {
      if (nameLowerB?.includes(queryLower)) {
        scoreB += 10
      }
      else {
        scoreB += 7
      }
    }

    // Priority 3: Partial Match in Name or Tags
    for (const term of queryLower?.split(/[\s\-_]+/)) {
      if (nameLowerA?.includes(term) || tagsLowerA?.includes(term)) {
        if (nameLowerA?.includes(term)) {
          scoreA += 3
        }
        else {
          scoreA += 2
        }
      }
      if (nameLowerB?.includes(term) || tagsLowerB?.includes(term)) {
        if (nameLowerB?.includes(term)) {
          scoreB += 3
        }
        else {
          scoreB += 2
        }
      }
    }

    // Priority 4: Shorter Name Length
    if (nameLowerA?.length < nameLowerB?.length) {
      scoreA += 11;
    }
    if (nameLowerA?.length > nameLowerB?.length) {
      scoreB += 11;
    }


    // Compare by relevance score
    if (scoreA !== scoreB) {
      return scoreB - scoreA; // Sort in descending order of relevance score
    }

    // If relevance scores are equal, sort by name length in ascending order as a tiebreaker
    return nameLowerA?.localeCompare(nameLowerB);
  }

  // Function to filter, sort, and return icons based on query and criteria
  function filterAndSortIcons(query, icons) {
    const root = new TrieNode();

    // Insert icons into the Trie
    for (const icon of icons) {
      insertIcon(root, icon);
    }

    // Split the query
    const queryTerms = query?.replaceAll(" ", "-")?.replaceAll("_", "-")?.split("-");

    // Search for icons matching the first query term
    const matchingIcons = searchIcons(root, queryTerms[0]);

    // Filter icons based on the remaining query terms
    const filteredIcons = matchingIcons?.filter(icon => {
      const nameLower = icon?.name?.toLowerCase();
      const tagsLower = icon?.tags?.toLowerCase();
      return queryTerms?.slice(1)?.every(term => nameLower?.includes(term) || tagsLower?.includes(term));
    });

    // Sort the matching icons based on your custom sorting logic
    const matchingIconsArray = [...filteredIcons];
    matchingIconsArray?.sort((a, b) => customSort(a, b, query));

    return matchingIconsArray;
  }





  useEffect(() => {
    if (!renderIconsList) return;
    setMaxPages(renderIconsList?.length / pageSize);
  }, [renderIconsList])


  useEffect(() => {

    if (!query && query !== " ") {
      setRenderIconsList(data?.icons);
    }

    else if (query && query !== '') {

      let sortedData = filterAndSortIcons(query, data?.icons);

      setRenderIconsList(sortedData);
    }

  }, [query, page]);

  useEffect(() => {
    setPage(1);
  }, [query])


  return (
    <>

      <div className="title">{renderIconsList ? renderIconsList?.length : 0} Icons</div>

      <div className='cards'>
        <div className="wrapper">

          {renderIconsList &&
            renderIconsList?.map((icon, i) => {

              if (i >= (page - 1) * pageSize && i < page * pageSize) {

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
              }
            })
          }

        </div>
      </div >
    </>
  )
}

export default Cards