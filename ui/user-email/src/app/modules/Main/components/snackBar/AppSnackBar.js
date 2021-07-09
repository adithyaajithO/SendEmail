import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from './Alert';

const AppSnackBar = ({ open, handleClose, severity, message }) => {
    return <Snackbar open={open} onClose={handleClose} autoHideDuration={5000} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Alert onClose={handleClose} severity={severity} >
            {message}
        </Alert>
    </Snackbar>
};

export default AppSnackBar;
