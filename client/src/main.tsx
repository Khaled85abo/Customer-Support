import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StateContextProvider from "./context/stateContext";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>LOADING...</div>}>
      <StateContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateContextProvider>
    </Suspense>
  </React.StrictMode>
);
