import ReactDom from "react-dom";
import "./index.css";
import { App } from "./App";
import React from "react";

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"));