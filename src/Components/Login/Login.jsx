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
import { ProgressSpinner } from 'primereact/progressspinner';
 

/**
 * User Login Page 
 * @returns username and password
 */

function Login() {
  /**
   * get state from reducer
   */
  const { login, isLoginLoading } = useSelector(state => state)

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

  //setting values for show and hide password
    const [values, setValues] = React.useState({
      password: '',
      showPassword: false,
    });
  
    //onclick on show hide password icon
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    //onmousedown for show hide password 
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    /**
     * onclick on login button
     * @param {form field values} values 
     */ 
    const onLoginUser = (values) =>{
      //calling onSubmitLogin function in actions and sending the values and callback function for response after api call
      dispatch(onSubmitLogin(values, (data)=>{
        if(data.status === 200){
          navigate("/profile");
        }
      }))
    }

  //   const header = (
  //     <img alt="Card" src="images/usercard.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
  // );

//set login button as footer for card 
    const footer = (
    <Button form='login' label={!isLoginLoading ? "Login":'  '} type='submit' icon="pi pi-user" className="p-button-rounded p-button-secondary">
       {isLoginLoading && <ProgressSpinner style={{width: '30px', height: '30px'}} strokeWidth="8" animationDuration=".5s"/>}
      </Button>
  );

  //useformik hook for from validations and form values
  const formik = useFormik({

    //set initial field values when form is opened in initialValues object
    initialValues: {
      username: '',
      password: '',
    },

    //onsubmitting the form 
    onSubmit: (values) => {
      onLoginUser(values);
    },
    
   // LogininSchema is function of yup validation assinig to validationSchema for form validation
    validationSchema: LogininSchema
  })


  return (
    <div className="loginMainComponent">
      <Card title="Login" className='logiCard mb-5 shadow-7 hover:shadow-8' style={{ width: '25rem', borderRadius: '1rem'}} /*header={header}*/ footer={footer}>
    {login && login.response && (login.response.data.status === 401 || login.response.data.status === 400 || login.response.data.status === 500) && <div className='errmsg mb-3'>{login.response.data.message}</div>}
      <form id="login" onSubmit={formik.handleSubmit}>
      <Box>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2.5 }} />
        <TextField
         sx={{ width: '15em'}}
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
      <Box>
     <LockIcon sx={{ color: 'action.active', mr: 1, my: 2.5 }}></LockIcon>
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

