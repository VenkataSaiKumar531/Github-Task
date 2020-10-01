import React from "react";

function List(props) {
  const renderItems = () => {
    return props.value.map(
      ({ name, contributors_url, id, description, html_url }) => {
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
          </div>
        );
      }
    );
  };

  console.log(props);
  return <div className="List">{renderItems()}</div>;
}

export default List;
