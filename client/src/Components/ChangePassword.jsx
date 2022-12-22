import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


function ChangePassword() {
    const [state, setState] = useState({
        oPassword: "",
        nPassword: "",
        cPassword: ""
    });
    const [msg, setMsg] = useState('')
    const [userRole, setUserRole] = useState('')
    const navigate = useNavigate()
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

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

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://127.0.0.1:3000/api/updatePassword/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        })
            .then((response) => {
                if (response.status !== 200) {
                    setMsg('Password Cannot Be Changed')
                    alert("Invalid Information")
                }
                console.log(response.status)
                return response.json();
            })

            .then((data) => {
                if (data.msg) {
                    setMessage(data.msg);
                } else {
                    navigate("/profile");
                    alert("You have sucessfully changed password!")
                    window.location.reload(true)
                }
            });
    };


    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-gray-600">
                            Change Password
                        </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label
                                htmlFor="oPassword"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Current Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="oPassword"
                                    value={state.oPassword}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="nPassword"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                New Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="nPassword"
                                    value={state.nPassword}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm New Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="cPassword"
                                    value={state.cPassword}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-purple-600">
                                Change
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword