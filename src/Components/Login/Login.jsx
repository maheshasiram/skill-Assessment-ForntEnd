import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { onSubmitLogin } from '../../actions/actions';
import { useNavigate } from 'react-router-dom';

/**
 * User Login Page 
 * @returns username and password
 */

function Login() {
  /**
   * get state from reducer
   */
const {login} = useSelector(state=> state) 
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

  return (
    <div id="loginMainComponent">
      <h1>Login</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={LogininSchema}
        onSubmit={values => {
          /**
           * call the method in actions after entering login details and send the values
           */
          dispatch(onSubmitLogin(values))
          /**
           * After successful login navigate to page
           */
           navigate('/')
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label>Username : </label>
            <Field name="username" />
            {errors.username && touched.username ? (
              <div>{errors.username}</div>
            ) : null}

            <label>Password : </label>
            <Field name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login;
