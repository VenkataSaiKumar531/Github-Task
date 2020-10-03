import React from "react";
import { connect } from "react-redux";
import { addFavItem, removeFavItem } from "../actions";

function List(props) {
  const clickFavActoin = ({ type, item }) => {
    switch (type) {
      case "add_fav":
        props.addFavItem(item);
        break;
      case "remove_fav":
        props.removeFavItem(item);
        break;
    }
  };
  const renderItems = () => {
    return props.value.map((item) => {
      const { name, contributors_url, id, description, html_url } = item;
      return (
        <div
          style={{ border: "1px solid red", padding: 25, margin: 10 }}
          key={id}
        >
          <div style={{ display: "flex", padding: 5 }}>
            <div>Name :: </div>
            <div style={{ fontWeight: "bold" }}>{name}</div>
          </div>
          <div style={{ display: "flex", padding: 5 }}>
            <div>Description :: </div>
            <div>{description}</div>
          </div>
          <div style={{ padding: 5 }}>
            <a href={html_url}>Repository</a>
          </div>
          <div style={{ padding: 5 }}>
            <a href={contributors_url}>Contributors</a>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                padding: 10,
                border: "1px solid black",
                cursor: "pointer",
              }}
              onClick={clickFavActoin.bind(this, { type: "add_fav", item })}
            >
              Add Favorite
            </div>
            <div
              style={{
                padding: 10,
                border: "1px solid black",
                marginLeft: 5,
                cursor: "pointer",
              }}
              onClick={clickFavActoin.bind(this, { type: "remove_fav", item })}
            >
              Remove Favorite
            </div>
          </div>
        </div>
      );
    });
  };
  return <div className="List">{renderItems()}</div>;
}

export default connect(null, { addFavItem, removeFavItem })(List);
