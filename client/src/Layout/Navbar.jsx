import React, { useState } from "react";
import { useEffect } from "react";
import { GiBookshelf } from "react-icons/gi";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { Outlet, redirect } from "react-router-dom";

function Navbar() {
    const [loggedIn, setLoggedIn] = useState('')
    const [userRole, setUserRole] = useState('')

    const id = JSON.parse(localStorage.getItem('tokenid'));

    const handleLogout = () => {
        localStorage.clear();
        setUserRole('')
        alert("Logout Successfully")

    }

    useEffect(() => {
        if (id === null) {
            redirect('/home');
        } else {
            fetch(`http://localhost:3000/api/all/${id}`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserRole(data.role)
                    console.log(userRole)
                });
        }
    }, [])

    return (
        <>
            <nav className="w-full bg-blue-900 shadow">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="/">
                            <h2 className="text-2xl font-bold text-white "><GiBookshelf style={{ color: 'yellow', fontSize: '50px' }} /></h2>
                        </a>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 `}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <li className="text-white hover:text-indigo-200">
                                    <a href="/">Home</a>
                                </li>
                                <li className="text-white hover:text-indigo-200">
                                    {userRole === '' ? <a></a> : <a href="/profile">Profile</a>}
                                </li>
                                <li className="text-white hover:text-indigo-200">
                                    {userRole === 'seller' ? <a href="/addlist">Add Listing</a> : <br/>}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="hidden space-x-2 md:inline-block ml-auto p-5">
                        {userRole === '' ?
                            <a href="/signin"
                                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                            >
                                Sign in
                            </a>
                            :
                            <a href='/'
                                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                                onClick={handleLogout}
                            >
                                Logout
                            </a>}

                    </div>
                    {userRole === '' ?
                        <a href="/signin"
                            className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                        >
                            <RiShoppingCart2Fill style={{ fontSize: '20px' }} /></a>
                        :
                        <a href="/cart"
                            className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                        >
                            <RiShoppingCart2Fill style={{ fontSize: '20px' }} /></a>
                    }

                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar