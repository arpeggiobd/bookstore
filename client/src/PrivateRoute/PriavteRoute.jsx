import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const token = JSON.parse(localStorage.getItem('token'));
 if(token == null) {
    return <Navigate to='/signin' />
 }

 return (
    <>
    <Outlet/>
    </>
 )
}

export default PrivateRoute