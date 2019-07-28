import React from "react";
import { render } from "react-dom";
import FilingsSearch from "./FilingsSearch";

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a href="#" className="navbar-brand">
          EDGAR Search
        </a>
      </nav>
      <div className="container-fluid app-container">
        <FilingsSearch />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app-root"));
