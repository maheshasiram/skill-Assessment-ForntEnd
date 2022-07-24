import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {/* {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[600],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null} */}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  // onClose: PropTypes.func.isRequired,
};

 function FormDialog(props) {
 
    const {onCloseDialog, actionType, id} = props;

  const handleClose = () => {
    onCloseDialog();
  };

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title"  sx={{backgroundColor: 'gainsboro'}}>
       <b> {actionType == 'Add' ? 'Add User' : 'Edit User'}</b>
        </BootstrapDialogTitle>
        <DialogContent dividers>
        {props.children}
        </DialogContent>
        <DialogActions className='my-1' sx={{backgroundColor: '#f0f3f294'}}>
          <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
          <Button form={id} id='userSubmit' variant="contained" className='px-5 mx-3' color="success" type="submit">{actionType}</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default FormDialog;

