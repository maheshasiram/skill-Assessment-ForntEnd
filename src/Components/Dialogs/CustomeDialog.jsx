import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Login from '../Login/Login';

 function FormDialog(props) {
 
    const {openLoginDialog, onCloseDialog} = props;

  const handleClose = () => {
    onCloseDialog();
  };

  return (
    <div>

      <Dialog open={openLoginDialog} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button form="login" id='login' /*onClick={handleClose}*/>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;