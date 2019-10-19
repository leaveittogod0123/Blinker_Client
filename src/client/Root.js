import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";
import { CookiesProvider } from "react-cookie";

const Root = () => (
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
);

export default Root;
