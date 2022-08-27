import React, { useEffect, useState, useRef } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import CustomTooltip from "../../ReuseComponents/CustomTooltip/CustomTooltip";
import jwtDecode from "jwt-decode";
import ChangePassword from "../UserManagement/ChangePassword";
import { useDispatch, useSelector } from 'react-redux';


//After successful login Admin redirect to this page

function ApplicationHeader() {

  // set useNavigate Hook to const navigate

  const navigate = useNavigate();

  // logout the user and navigate to home login page

  const onLogout = () => {
    navigate('/')
  }


  const [actionType, setActionType] = useState('');
  const [changePasswordForm, setChangePasswordForm] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onCloseDialog = () => {
    setDialogOpen(false);
    setChangePasswordForm(false);
}

  const resetPassword = () => {
    setActionType('Submit');
    setChangePasswordForm(true);
  }

  return (
    <React.Fragment>

      {changePasswordForm && <ChangePassword
        actionType={actionType}
        onCloseDialog={onCloseDialog}
      />}
      <CustomTooltip title="Account Settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 45, height: 45 }}>{jwtDecode(sessionStorage.getItem('JWTtoken')).username.charAt(0).toUpperCase()}</Avatar>
        </IconButton>
      </CustomTooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={resetPassword}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Reset Password
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );

}

export default ApplicationHeader;




