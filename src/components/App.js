import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import List from "./List";
import getPublicRepos from "../utils/axios";
import getFavItems from "../actions";
import store from "../reducers/favorite";
const FAV_ITEMS = "FAV_ITEMS";
const PUBLIC_ITEMS = "PUBLIC_ITEMS";

function App(props) {
  const [context, setContext] = useState(PUBLIC_ITEMS);

  const [items, setItems] = useState([]);
  const [favItems, setFavItems] = useState(props.favItems);
  const [currentItems, setCurrentItems] = useState([]);

  const [startPage, setStartPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(async () => {
    await fetchPaginatedPublicRepos(0);
  }, []);

  useEffect(() => {
    setFavItems(props.favItems);
    if (context == FAV_ITEMS) setCurrentItems(props.favItems);
  }, [props.favItems]);

  const fetchPaginatedPublicRepos = async (since) => {
    const newItems = await getPublicRepos(since);
    const updatedItems = [...items, ...newItems];
    setItems(updatedItems);
    updateCurrentItems({ items: updatedItems, startPage, pageSize });
  };

  const updateCurrentItems = ({ items, startPage, pageSize }) => {
    let tempItems = [];
    for (let ind = 0; ind + startPage < items.length && ind < pageSize; ind++) {
      tempItems.push(items[ind + startPage]);
    }
    setCurrentItems(tempItems);
  };

  const onClickPagination = ({ type }) => {
    if(context==FAV_ITEMS) return; //Pagination is only for Public repos

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

  const onClickContext = ({ type }) => {
    setContext(type);
    switch (type) {
      case FAV_ITEMS:
        setCurrentItems(favItems);
        break;
      case PUBLIC_ITEMS:
      default:
        updateCurrentItems({
          items,
          startPage,
          pageSize,
        });
    }
  };

  return (
    <div>
      <div
        style={{
          padding: 10,
          display: "flex",
          textAlign: "center",
          width: 600,
          margin: "auto",
        }}
      >

        <div
          style={{
            padding: 20,
            cursor: "pointer",
            width: 300,
            border: "1px solid black",
            // Heightlight the tab to show Public Repositories vs Favorite Repositories
            background: context == PUBLIC_ITEMS?'coral':null 
          }}
          onClick={onClickContext.bind(this, { type: PUBLIC_ITEMS })}
        >
          Public Repositories
        </div>
        <div
          style={{
            padding: 20,
            cursor: "pointer",
            width: 300,
            border: "1px solid black",
            marginLeft: 10,
            // Heightlight the tab to show Public Repositories vs Favorite Repositories
            background: context == FAV_ITEMS?'coral':null
          }}
          onClick={onClickContext.bind(this, { type: FAV_ITEMS })}
        >
         {favItems.length} Favorite Repositories 
        </div>
      </div>
      <hr />
      <hr />

      <div className="">
        <div style={{ padding: 20, marginBottom: 50 }}>
          <div
            style={{
              float: "left",
              padding: 20,
              cursor: "pointer",
              border: "1px solid black",
            }}
            onClick={onClickPagination.bind(this, { type: "prev" })}
          >
            {"<<"}Prev
          </div>
          <div
            style={{
              float: "right",
              padding: 20,
              cursor: "pointer",
              border: "1px solid black",
            }}
            onClick={onClickPagination.bind(this, { type: "next" })}
          >
            Next {">>"}
          </div>
        </div>
        <div>
          <List value={currentItems} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { favItems: Object.values(state.favorite) };
};
export default connect(mapStateToProps)(App);
