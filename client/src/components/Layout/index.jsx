import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

import { EthProvider } from "../../contexts/EthContext";
import { SnackbarProvider } from 'notistack';
import Intro from "../Intro/";
import Demo from "../Demo";
import Footer from "../Footer";
import Profile from "../Profile";
import TopBar from "../TopBar";

function Layout() {
  return (
    <EthProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
      >
        <TopBar />
      </SnackbarProvider>
      <main>
        <div id="App">
          <div className="container">
          <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </EthProvider>
  );
}

export default Layout;
