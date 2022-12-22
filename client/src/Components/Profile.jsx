
import { useState, useEffect } from "react"
import { React } from "react"
import ChangePassword from "./ChangePassword"
import SellerRole from "./SellerRole"


function Profile() {
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

   return (
    <>
    <ChangePassword />
    {userRole === 'seller' ?  <br/>: <SellerRole />}
    </>
   )
}

    export default Profile