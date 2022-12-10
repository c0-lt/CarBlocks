import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./index.css";
import App from "./App";

import {WagmiConfig, createClient} from "wagmi";
import {ethers} from "ethers";

const client = createClient({
  autoConnect: true,
  provider: new ethers.providers.Web3Provider(window.ethereum),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <WagmiConfig client={client}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </WagmiConfig>
  //</React.StrictMode>
);
