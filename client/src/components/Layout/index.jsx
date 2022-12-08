import * as React from "react";
import {Routes, Route, Outlet, Link} from "react-router-dom";

import {SnackbarProvider} from "notistack";
import Footer from "../Footer";
import TopBar from "../TopBar";

import Container from "@mui/material/Container";

function Layout() {
  return (
    <>
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
    </>
  );
}

export default Layout;
