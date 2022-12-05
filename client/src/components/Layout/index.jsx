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

import Container from "@mui/material/Container";

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
      <Container
      sx={{
        mt: 6,
        mb: 6,
        bgcolor: "background.paper",
      }}
      maxWidth="sm"
    >
          <Outlet />
          </Container>
      </main>
      <Footer />
    </EthProvider>
  );
}

export default Layout;
