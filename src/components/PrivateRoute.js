import React,{useContext} from 'react';
import {Navigate} from 'react-router';
import {AuthContext} from '../Context/AuthContext';
import {Route} from 'react-router-dom';


function PrivateRoute({children}){
    const {user} =useContext(AuthContext);
    return user?children:<Navigate to='Login'/>
}

export default PrivateRoute;