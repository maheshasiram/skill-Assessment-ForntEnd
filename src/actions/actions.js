

import axiosinstance from "../axiosinstance";
import endPoints from "../constants/endPoints";
import { Types } from "../constants/Types";

/**
 * For User Login
 * @param {username, password} values 
 * @returns JWTtoken and decode that token we get username, role and timestamp.
 */
export const onSubmitLogin=(values)=>{
    return function(dispatch){
        axiosinstance.post(endPoints.LOGIN, 
            {
            "password": values.password,
            "username": values.username
          }).then(response=>{
           dispatch({type: Types.LOGIN, payload: response});
          })
          .catch(err=>{
            dispatch({type: Types.LOGIN, payload: err});
            console.log("err", err)
          })
    }  
}
