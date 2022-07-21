
import jwtDecode from "jwt-decode";
import axiosinstance from "../axiosinstance";
import endPoints from "../constants/endPoints";
import { Types } from "../constants/Types";
import store from "../store";

/**
 * Refresh token for new jwtToken
 */
const RefreahToken = (token) => {
  //get jwttoken from sessionstorage
  //decode token using jwtDecode
  //assign to decodedtoekn constat 
  const decodedtoekn = jwtDecode(token);
  var unixTimeStamp = decodedtoekn && decodedtoekn.exp;
  var date = new Date(unixTimeStamp * 1000);
  const stamp_time = date.getTime() - Date.now()
  //setInterval is to call for every given interval of time in milliseconds
  setInterval(() => {
    //get Authorization token, set to headers and assigning to config constant
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    //post request for REFRESH api 
    //axiosinstance is imported , we decleared baseurl, axios and headers 
    //endpoints is imported, we decleared api end points
    axiosinstance.post(endPoints.REFRESH, null, config)
      .then(response => {
        sessionStorage.setItem('JWTtoken', response.data.token);
      })
      .catch(err => {
        console.log("err", err)
      })

  }, stamp_time - 2000);

}

/**
 * For User Login
 * @param {username, password} values 
 * @returns JWTtoken and decode that token we get username, role and timestamp.
 */
export const onSubmitLogin = (values, callback) => {
  return function (dispatch) {
    dispatch({ type: Types.IS_LOGIN_LOADING, payload: true });
    const usersParams = store.getState().usersParams
    axiosinstance.post(endPoints.LOGIN,
      {
        "username": values.username,
        "password": values.password
      }).then(response => {
        callback(response)
        dispatch({ type: Types.IS_LOGIN_LOADING, payload: false });
        dispatch({ type: Types.LOGIN, payload: response });
        dispatch(getUsers(response.data.token, usersParams));
        sessionStorage.setItem('JWTtoken', response.data.token);
        RefreahToken(response.data.token);
      })
      .catch(err => {
        callback(err)
        dispatch({ type: Types.LOGIN, payload: err });
        dispatch({ type: Types.IS_LOGIN_LOADING, payload: false });
      })
  }
}

/**
 * For user details after login
 * @param {JWTtoken} token 
 * @returns userdetails
 */
export const getUsers = (token, usersParams) => {
  return function (dispatch) {

    const config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    axiosinstance.get(endPoints.USERS +
      `?page=${usersParams.page}&pageSize=${usersParams.pageSize}&search=${usersParams.search}`,
      config
    ).then(response => {
      dispatch({ type: Types.GET_USERS, payload: response });
    })
      .catch(err => {
        dispatch({ type: Types.GET_USERS, payload: err });
      })
  }
}

/**
 * when user is clicked on login button
 * @param {get form field values entered by user} values 
 * @returns user is Authorised or not 
 */
export const createUser = (values, callback) => {
  return function (dispatch) {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('JWTtoken'),
      }
    }
    axiosinstance.post(endPoints.USER, values, config)
      .then(response => {
        dispatch({ type: Types.CREATE_USER, payload: response });
        callback(response);
      })
      .catch(err => {
        dispatch({ type: Types.CREATE_USER, payload: err });
        callback(err)
      })
  }
}

export const getUserRoles = () => {
  return function (dispatch) {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('JWTtoken'),
      }
    }
    axiosinstance.get(endPoints.USERROLES, config)
      .then(response => {
        dispatch({ type: Types.GET_USER_ROLES, payload: response });
      })
      .catch(err => {
        dispatch({ type: Types.GET_USER_ROLES, payload: err });
      })
  }
}

