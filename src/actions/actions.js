

import axiosinstance from "../axiosinstance";
import endPoints from "../constants/endPoints";
import { Types } from "../constants/Types";

/**
 * For User Login
 * @param {username, password} values 
 * @returns JWTtoken and decode that token we get username, role and timestamp.
 */
export const onSubmitLogin = (values) => {
  return function (dispatch) {
    axiosinstance.post(endPoints.LOGIN,
      {
        "username": values.username,
        "password": values.password
      }).then(response => {
        dispatch({ type: Types.LOGIN, payload: response });
        setTimeout(() => {
         dispatch(getUsers(response.data.token)) 
        }, 500);
      })
      .catch(err => {
        dispatch({ type: Types.LOGIN, payload: err });
        console.log("err", err)
      })
  }
}

 const getUsers =(token)=>{
  return function (dispatch) {
    const config={
      headers:{
        'Authorization': 'Bearer '+token,
      }
    }
    const body = {
      email: "user@provider.com",
      password: "stringst",
      role: "manager",
      username: "string"
    }
   // axiosinstance.post("/user", body, config
     axiosinstance.get(endPoints.USERS,config
      ).then(response => {
        //dispatch({ type: Types.LOGIN, payload: response });
      })
      .catch(err => {
       // dispatch({ type: Types.LOGIN, payload: err });
      })
  }
}


