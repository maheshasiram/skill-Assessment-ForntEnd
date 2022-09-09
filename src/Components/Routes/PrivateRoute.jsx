import { useSelect } from '@mui/base';
import React from 'react';
import { Navigate } from 'react-router-dom';



function PrivateRoute({component: Component, restricted, ...rest}){
    if(sessionStorage.getItem('JWTtoken')){
        return <Component {...rest} />; 
    }
        return <Navigate to='/' />;    
    
}

export default PrivateRoute;