import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Signup() {
    const [state, setState] = useState({
        password: "",
        cPassword: "",
    });
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [passMatch, setPassMatch] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        validatePassword();
    }, [state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    function validatePassword() {
        if (state.password === state.cPassword) {
            setPassMatch(true)
        } else {
            setPassMatch(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target));

        fetch("http://127.0.0.1:3000/api/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Bad status code from server.');
                }
                if (response.status !== 200) {
                    alert("Invalid Information")
                }
                console.log(response.status)
                return response.json();
            })
            .then((data) => {
                if (data.msg) {
                    setMessage(data.msg);
                } else {
                    navigate("/");
                    alert("Welcome!!! You have sucessfully registered!")
                }
            });
    };

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <h3 className="text-4xl font-bold text-green-600">
                        Sign Up
                    </h3>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <form method="post" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 undefined">
                                Username
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 undefined">
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 undefined">
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={state.password}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 undefined">
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    id="cPassword"
                                    name="cPassword"
                                    value={state.cPassword}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="input-error" style={{ color: "red" }}>
                            {passMatch ? "" : "Error: Passwords do not match"}
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <a
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                                href="/signin"
                            >
                                Already registered?
                            </a>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;


