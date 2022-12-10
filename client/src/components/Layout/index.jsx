import * as React from "react";
import {Outlet} from "react-router-dom";

import {SnackbarProvider} from "notistack";
import Footer from "../Footer";
import TopBar from "../TopBar";

import Container from "@mui/material/Container";
import {BackdropProvider} from "../../contexts/Loader";
// import {AlertProvider} from "../../contexts/Alert";

function Layout({handleChild}) {
  // React.useEffect(() => {
  //   console.log(isConnected);

  //   if (isConnected === true) {
  //     handleChild(true);
  //   }
  // });

  return (
    <BackdropProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        autoHideDuration={6000}
      >
        <TopBar handleChild={handleChild}/>
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
      </SnackbarProvider>
    </BackdropProvider>
  );
}

export default Layout;
