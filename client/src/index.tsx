import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "../public/assets/styles.scss";
import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
