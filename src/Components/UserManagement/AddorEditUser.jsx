import React from "react";
import FormDialog from "../../ReuseComponents/Dialogs/FormDialog";
import * as Yup from 'yup';
import { TextField, Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { createUser, getUsers } from "../../actions/actions";
import _ from 'lodash'
import { AlertDialog } from "../../ReuseComponents/Dialogs/actiondialog";

function AddorEditUser(props) {
  const { onCloseDialog, actionType } = props;

  const { UserRoles, usersParams } = useSelector(state => state);

  const dispatch = useDispatch();

  const CreateUserSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
      roleId: Yup.string()
      .required('Please Enter Role'),
    email: Yup.string().email('Invalid email').required('Required'),
  });


  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

const onSubmitCreateUser=(values)=>{
  dispatch(createUser(values,(data)=>{
    if(data.status === 200){
      onCloseDialog();
      dispatch(AlertDialog({
        status: data.status === 200 && '1',
         message: data.data.message,
          onok: () => {
            dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));
        }
      }))
    }
    }));
}


  const formik = useFormik({
    initialValues:{
      username: '',
      password: '',
      roleId: '',
      email: '',
    },
    onSubmit: (values) => {
      onSubmitCreateUser(values);
    },
    validationSchema: CreateUserSchema,
  })
  return (
    <FormDialog
      onCloseDialog={onCloseDialog}
      actionType={actionType}
      title={actionType}
      id="user-form"
    >

      <form id="user-form" onSubmit={formik.handleSubmit} className="my-4 mx-8">
        <Box sx={{ mb: 2 }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2.5 }} />
          <TextField
            sx={{ width: '17em' }}
            name='username'
            label="Username"
            variant='outlined'
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <LockIcon sx={{ color: 'action.active', mr: 1, my: 2.5 }}></LockIcon>
          <TextField
            type={values.showPassword ? 'text' : 'password'}
            name='password'
            label='Password'
            variant='outlined'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 2.5 }} />
          <FormControl>
            <InputLabel>Select Role</InputLabel>
            <Select
              sx={{ width: '17em' }}
              name='roleId'
              variant='outlined'
              id="roleId"
              label="Select Role"
              value={formik.values.roleId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.roleId && Boolean(formik.errors.roleId)}
            >
              {UserRoles && UserRoles.data &&
                _.map(UserRoles.data, (users, index) =>(
                  <MenuItem key={users.id} value={users.id}>{users.role}</MenuItem>
                ))}
            </Select>
            <FormHelperText sx={{ color: 'red' }}>{formik.touched.roleId && formik.errors.roleId}</FormHelperText>
          </FormControl>


        </Box>
        <Box>
          <EmailIcon sx={{ color: 'action.active', mr: 1, my: 2.5 }} />
          <TextField
            sx={{ width: '17em' }}
            name='email'
            label="Email"
            variant='outlined'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
      </form>
    </FormDialog>
  )
}

export default AddorEditUser;



