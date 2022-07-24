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
    handleClose();
}

  return (
    <div className='alertDialog'>
      <Dialog
        open={modal.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{width: '35w', zIndex : 0}}
      >
        <DialogTitle sx={{backgroundColor: 'cadetblue', lineHeight: 1}}>
      {modal.header} 
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{fontSize: '20px'}} className='d-flex justify-content-center align-items-center px-5 py-4'>
           <span>
            <i className={`pi pi-exclamation-triangle exclamation-alert 
               ${modal.status === 0 ? `text-warning` : modal.status === 2 ? `text-success` : `text-error`} `}></i>
           </span> 
           <span className='px-2 justify-content-center d-inline-flex align-items-center'> {modal.message}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{backgroundColor: 'antiquewhite', lineHeight: 1}}>
        {modal.header === 'Confirm' && <Button variant="contained" color='inherit' onClick={handleClose}>cancel</Button>}
          <Button sx={{width: '20%'}} variant="contained" color="success" onClick={onClickOK} >
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;