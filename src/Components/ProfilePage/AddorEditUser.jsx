import React from "react";
import FormDialog from "../Dialogs/CustomeDialog";
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {Box} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import {InputAdornment} from '@mui/material';
import {IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { createUser } from "../../actions/actions";

function AddorEditUser(props) {
  const { openDialog, onCloseDialog, actionType } = props;

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
      role: Yup.string()
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

const onSubmitUser=(values)=>{
  dispatch(createUser(values));
}


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      role: '',
      email: '',
    },
    onSubmit: (values) => {
      onSubmitUser(values);
      
    },
    validationSchema: CreateUserSchema,
  })
  return (
    <FormDialog
      openDialog={openDialog}
      onCloseDialog={onCloseDialog}
      actionType={actionType}
      id="user-form"
    >
      
      <form id="user-form" onSubmit={formik.handleSubmit} className="my-4 mx-8">
      <Box sx={{mb: 2}}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2.5 }} />
        <TextField
         sx={{ width: '17em'}}
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
      <Box sx={{mb: 2}}>
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
    <Box sx={{mb: 2}}>
        <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 2.5 }} />
        <TextField
         sx={{ width: '17em'}}
          name='role'
          label="Role"
          variant='outlined'
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
        />
      </Box>
      <Box>
        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 2.5 }} />
        <TextField
         sx={{ width: '17em'}}
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



