import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AppContext } from '../../App';

export default function SnackBar({message, severity}) {
	const { snackBarOpen, setSnackBarOpen } = React.useContext(AppContext);

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  return (
    <div>
      <Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={handleSnackBarClose}>
        <Alert
          onClose={handleSnackBarClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}