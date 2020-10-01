import React, { useEffect, useState } from "react";
import List from "./components/List";
import getPublicRepos from "./utils/axios";

import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const [startPage, setStartPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(async () => {
    await fetchPaginatedPublicRepos(0);
  }, []);

  const fetchPaginatedPublicRepos = async (since) => {
    const newItems = await getPublicRepos(since);
    const updatedItems = [...items, ...newItems];
    setItems(updatedItems);
    updateCurrentItems({ items: updatedItems, startPage, pageSize });
  };

  const updateCurrentItems = ({ items, startPage, pageSize }) => {
    console.log("updateCurrentItems", items, startPage, pageSize);
    let tempItems = [];
    for (let ind = 0; ind + startPage < items.length && ind < pageSize; ind++) {
      tempItems.push(items[ind + startPage]);
    }
    setCurrentItems(tempItems);
  };

  const onClickPagination = ({ type }) => {
    console.log(type);
    let startPageNow = 0;
    switch (type) {
      case "prev":
        if (startPage - pageSize < 0) {
          alert("You are not allowed to perform previous action");
          return;
        }
        startPageNow = startPage - pageSize;
        setStartPage(startPageNow);
        break;
      case "next":
        startPageNow = startPage + pageSize;
        setStartPage(startPageNow);
        if (startPageNow > items.length)
          fetchPaginatedPublicRepos(items.length);

        break;
    }
    updateCurrentItems({
      items,
      startPage: startPageNow,
      pageSize,
    });
  };

  return (
    <div className="">
      <div style={{ padding: 40 }}>
        <div
          style={{ float: "left", padding: 20, cursor: "pointer" }}
          onClick={onClickPagination.bind(this, { type: "prev" })}
        >
          Prev
        </div>
        <div
          style={{ float: "right", padding: 20, cursor: "pointer" }}
          onClick={onClickPagination.bind(this, { type: "next" })}
        >
          Next
        </div>
      </div>
      <div>
        <List value={currentItems} />
      </div>
    </div>
  );
}

export default App;
