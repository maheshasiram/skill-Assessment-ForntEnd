//import { Formik, Form, } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { onSubmitLogin } from '../../actions/actions';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from "primereact/button";
import { useFormik } from 'formik';
import {Box} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import {InputAdornment} from '@mui/material';
import {IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import { Card } from 'primereact/card';

/**
 * User Login Page 
 * @returns username and password
 */

function Login() {
  /**
   * get state from reducer
   */
  const { login } = useSelector(state => state)
  /**
   * set useDispatch Hook to const dispatch
   */
  const dispatch = useDispatch();
  /**
   * set useNavigate Hook const navigate
   */
  const navigate = useNavigate();
  /**
   * Yup for error validation of login form 
   */
  const LogininSchema = Yup.object().shape({
    username: Yup.string()
      .required('Required'),
    password: Yup.string()
      .required('Required'),
  });

    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

  //   const header = (
  //     <img alt="Card" src="images/usercard.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
  // );

    const footer = (
      <Button form='login' label="Login" type='submit' icon="pi pi-user" className="p-button-rounded p-button-secondary" />
  );
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(onSubmitLogin(values))
       navigate("/profile");
    },
    validationSchema: LogininSchema
  })


  return (
    <div id="loginMainComponent">
      <Card title="Login" className='p-3 mb-5 shadow-7 hover:shadow-8' style={{ width: '25rem', marginLeft: '17em', borderRadius: '1rem'}} /*header={header}*/ footer={footer}>

      <form id="login" onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
        sx={{ width: '15em' }}
          name='username'
          label="Username"
          variant='standard'
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
     <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}></LockIcon>
          <TextField
          type={values.showPassword ? 'text' : 'password'}
          name='password'
          label='Password'
           variant='standard'
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
    
      </form>
      </Card>

    </div>
  )
}

export default Login;

