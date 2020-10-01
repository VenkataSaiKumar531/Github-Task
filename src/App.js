import React from "react";
import List from "./components/List";
import "./App.css";

var items = [
  {
    name: "grit",
    contributors_url: "https://api.github.com/repos/mojombo/grit/contributors",
  },
  {
    name: "grit",
    contributors_url: "https://api.github.com/repos/mojombo/grit/contributors",
  },
  {
    name: "grit",
    contributors_url: "https://api.github.com/repos/mojombo/grit/contributors",
  },
];

function App() {
  return (
    <div className="App">
      <List value={items} />
    </div>
  );
}

export default App;
