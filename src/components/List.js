import React from "react";

function List(props) {
  const renderItems = () => {
    return props.value.map(({ name, contributors_url }) => {
      return (
        <div style={{ border: "1px solid red", padding: 25, margin: 10 }}>
          <div style={{ display: "flex" }}>
            <div>Name :: </div>
            <div>{name}</div>
          </div>
          <div>
            <a href={contributors_url}>Contributors</a>
          </div>
        </div>
      );
    });
  };

  console.log(props);
  return (
    <div className="List">
      Master List
      {renderItems()}
    </div>
  );
}

export default List;
