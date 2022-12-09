import React, { useState, Fragment } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import BackdropContext from "./BackdropContext";

/* const DEFAULT_OPTIONS = {
  backdropProps: {},
  progressProps: {},
}; */

const BackdropProvider = ({ children, progress }) => {
  const [open, setOpen] = useState(false);
  const backdrop = {
    showLoader() {
      setOpen(true);
    },
    hideLoader() {
      setOpen(false);
    },
  };

  return (
    <Fragment>
      <BackdropContext.Provider value={backdrop}>
        {children}
      </BackdropContext.Provider>
      <Backdrop
        sx={{ color: "#fff", zIndex: 1500 }}
        open={open}
      >
        {progress ? progress : <CircularProgress color="inherit" />}
      </Backdrop>
    </Fragment>
  );
};

export default BackdropProvider;
