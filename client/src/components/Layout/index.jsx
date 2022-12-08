import * as React from "react";
import {Routes, Route, Outlet, Link} from "react-router-dom";

import {SnackbarProvider} from "notistack";
import Footer from "../Footer";
import TopBar from "../TopBar";

import Container from "@mui/material/Container";
import { Backdrop, CircularProgress } from "@mui/material";
import { BackdropProvider } from "../../contexts/Loader";

function Layout() {
  return (
    <BackdropProvider>
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
          maxWidth="lg"
        >
          <Outlet />
        </Container>
      </main>
      <Footer />
    </BackdropProvider>
  );
}

export default Layout;
