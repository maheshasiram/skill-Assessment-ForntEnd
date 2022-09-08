import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({component: Component, restricted, ...rest}){
    if(sessionStorage.getItem('JWTtoken')){
        return <Navigate to='/admin' />
    }
    return <Component {...rest} />
}

export default PublicRoute;