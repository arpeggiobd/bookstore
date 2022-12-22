import React from "react";
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function SellerRoute() {
    const [userRole, setUserRole] = useState('')
    const id = JSON.parse(localStorage.getItem('tokenid'));

    useEffect(() => {
        fetch(`http://localhost:3000/api/all/${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setUserRole(data.role)
            });
    }, [])

 if(userRole === 'buyer') {
    return <Navigate to='/' />
 }

 return (
    <>
    <Outlet/>
    </>
 )
}

export default SellerRoute