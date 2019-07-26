import React from "react";
import { render } from "react-dom";
import FilingsSearch from "./FilingsSearch";

const App = () => {
  return (
    <div>
      <FilingsSearch />
    </div>
  );
};

render(<App />, document.getElementById("app-root"));
