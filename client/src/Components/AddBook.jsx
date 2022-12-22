import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "./Alert";


function AddBook() {
    const navigate = useNavigate()

    const tokenid = JSON.parse(localStorage.getItem('tokenid'));

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target));
        console.log(data)

        fetch("http://localhost:3000/api/addbook", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate('/addimage', { state: { id: data } })
            });

    };


    return (
        <>
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 -600 lg:max-w-xl items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
                    <div>
                        <a href="/">
                            <h3 className="text-4xl font-bold text-gray-600 ">
                                Add Book
                            </h3>
                        </a>
                    </div>

                    <form onSubmit={handleSubmit} className="form">
                        <div className="mt-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="author"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Author
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="author"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                /> 
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Description
                            </label>

                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="description"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Price
                            </label>

                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="price"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Token
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="createdBy"
                                    value={tokenid}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                    readOnly
                                /> 
                            </div>
                        </div>
                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-purple-600">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddBook