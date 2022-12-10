import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';

const AlertContext = React.createContext(null);
AlertContext.displayName = 'AlertContext';

const AlertProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertDetails, setAlertDetails] = useState(null);

  const openAlert = () => {
    setOpen(true);
  };

  const closeAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const forceCloseAlert = () => {
    setOpen(false);
  }

  const obj = {
    show: (type, message, details) => {
      setType(type);
      setAlertMessage(message);
      setAlertDetails(details);
      openAlert()
    },
    hide: forceCloseAlert
  }

  return (
    <AlertContext.Provider
      value={obj}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity={type}>
          {alertMessage} — {alertDetails}
        </Alert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export default AlertContext;