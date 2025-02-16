import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Whiteboard from "./components/white";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Whiteboard />
    <App />
  </StrictMode>
);
