import React from "react";
import { render } from "react-dom";
import FilingsSearch from "./FilingsSearch";

const App = () => {
  return (
    <div className="app-container">
      <div className="header">
        <h1>EDGAR Search Client</h1>
      </div>
      <FilingsSearch />
    </div>
  );
};

render(<App />, document.getElementById("app-root"));
