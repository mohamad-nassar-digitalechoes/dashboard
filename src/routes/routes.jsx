import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Redirect,Route } from 'react-router-dom'
import Myheader from '../Admin/layouts/header';
import AuthToken from '../Middleware/AuthToken';
import Middleware from '../Middleware/middleware';

function PublicRoute({component:Component,...rest})
{
    return(
        <Route exact {...rest} render={(props)=>{
            return[<Component />];
        }} />
    )
}
function ProtectedRoute({isAuth:auth,component:Component,role:roles,...rest})
{
    return(
        <Route exact {...rest} render={(props)=>{
            if(auth) return[<div className="wrapper"><Myheader /><div className='content-wrapper'><Component /></div></div>];
            else return <Redirect to={{pathname:'/login', state:{from:props.location}}} /> 
        }} />
    )
}

export {PublicRoute,ProtectedRoute}