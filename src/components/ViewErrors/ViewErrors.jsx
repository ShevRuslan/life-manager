import React, { useState, useCallback } from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useViewErrors = (errors) => {
  const [open, setOpen] = useState(false);

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const openViewError = useCallback(() => {
    if (Object.keys(errors).length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  });
  const viewErrors = () => {
    let viewError = null;
    if (Object.keys(errors).length !== 0) {
      viewError = (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          {
            <Alert elevation={6} variant="filled" severity="error" onClose={handleClose}>
              {Object.keys(errors).map((fieldName, key) => {
                return <div key={key}>{errors[fieldName]}</div>;
              })}
            </Alert>
          }
        </Snackbar>
      );
    }
    return viewError;
  };
  return {
    viewErrors,
    openViewError
  }
}

export default useViewErrors;