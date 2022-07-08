

import axiosinstance from "../axiosinstance";
import endPoints from "../constants/endPoints";
import { Types } from "../constants/Types";

/**
 * For User Login
 * @param {username, password} values 
 * @returns JWTtoken and decode that token we get username, role and timestamp.
 */
export const onSubmitLogin = (values, callback) => {
  return function (dispatch) {
    dispatch({ type: Types.IS_LOGIN_LOADING, payload: true });
    axiosinstance.post(endPoints.LOGIN,
      {
        "username": values.username,
        "password": values.password
      }).then(response => {
        callback(response)
        dispatch({ type: Types.IS_LOGIN_LOADING, payload: false });
        dispatch({ type: Types.LOGIN, payload: response });
        setTimeout(() => {
         dispatch(getUsers(response.data.token)) 
        }, 500);
       
      })
      .catch(err => {
        callback(err)
        dispatch({ type: Types.LOGIN, payload: err });
        dispatch({ type: Types.IS_LOGIN_LOADING, payload: false });
        // console.log("err", err)
      })
  }
}

 const getUsers =(token)=>{
  return function (dispatch) {
    const config={
      headers:{
        'Authorization': 'Bearer '+ token,
      }
    }
     axiosinstance.get(endPoints.USERS,config
      ).then(response => {
        //dispatch({ type: Types.LOGIN, payload: response });
      })
      .catch(err => {
       // dispatch({ type: Types.LOGIN, payload: err });
      })
  }
}


