import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector,useDispatch } from 'react-redux';
import { Types } from '../../constants/Types';

function AlertDialog() {

  const { modal } = useSelector(state => state);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({type: Types.ON_CLOSE_ALERT_DIALOG, payload: {...modal, open: false}});
  };

const onClickOK=()=>{
  modal.onok();
  setTimeout(() => {
    handleClose();
  }, 200);
}

  return (
    <div>
      <Dialog
        open={modal.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {modal.header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modal.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {modal.header === 'Confirm' && <Button onClick={handleClose}>cancel</Button>}
          <Button onClick={onClickOK} autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;