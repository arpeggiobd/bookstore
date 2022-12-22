import { React, useState } from "react"
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [error, setError] = useState(" ");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target));

        fetch("http://localhost:3000/api/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

            .then((response) => {
                if (response.ok) {

                    setTimeout(() => {
                        navigate("/");
                    }, 0)
                } else {
                    setError("Invalid Username/Password");
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("tokenid", JSON.stringify(data.tokenid));
                localStorage.setItem("token", JSON.stringify(data.token));
                console.log(data);
                window.location.reload(false);
            });
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 -600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 uppercase ">
                    Sign in
                </h1>
                <form className="mt-6" method="post" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <a style={{color:'red'}}>{error}</a>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SignIn