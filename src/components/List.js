import React,{ useEffect, useState }  from "react";
import { connect } from "react-redux";
import { addFavItem, removeFavItem } from "../actions";

function List(props) {

  const [favItems, setFavItems] = useState({});
  useEffect(() => {
    setFavItems(props.favItems);
  }, [props.favItems]);


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
          style={{ border: "1px solid blue", padding: 25, margin: 10,background: favItems[id]?'aquamarine':'aliceblue' }}
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
                // Heightlight the tab to show Public Repositories vs Favorite Repositories
                background: favItems[id]?'crimson':null
              }}
              onClick={clickFavActoin.bind(this, { type: favItems[id]?"remove_fav":"add_fav", item })}
            >
             {favItems[id]?'Remove Favorite':'Add Favorite'}
            </div>
          </div>
        </div>
      );
    });
  };
  return <div className="List">{renderItems()}</div>;
}
const mapStateToProps = (state) => {
  return { favItems: state.favorite };
};
export default connect(mapStateToProps, { addFavItem, removeFavItem })(List);
