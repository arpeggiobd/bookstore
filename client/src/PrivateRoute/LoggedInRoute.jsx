import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function LoggedInRoute() {
    const token = JSON.parse(localStorage.getItem('token'));
 if(token != null) {
    return <Navigate to='/' />
 }

 return (
    <>
    <Outlet/>
    </>
 )
}

export default LoggedInRoute