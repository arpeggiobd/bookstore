import React, { useEffect } from "react";
import { useState } from "react";
import { RiWindowFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

function Details() {
    const [data, setData] = useState([])
    const [userRole, setUserRole] = useState('')
    const [postReview, setPostReview] = useState(false)
    const [review, setReview] = useState([])
    const [state, setState] = useState('')
    const [editStage, setEditStage] = useState(false)
    const [username, setUsername] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const id = location.state

    const token = JSON.parse(localStorage.getItem('tokenid'));
    console.log(id)

    useEffect(() => {
        fetch(`http://localhost:3000/api/book/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            });
    }, [])

    useEffect(() => {
        if (token === null) {
            console.log('id is null')
        } else {
            fetch(`http://localhost:3000/api/all/${token}`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserRole(data.role)
                    setUsername(data.username)
                    console.log(userRole)
                    console.log(username)
                });
        }
    }, [])

    const handleAddCart = (id) => (event) => {
        if (userRole === '') {
            navigate('/signin')
        } else {
            event.preventDefault();
            console.log(id);

            fetch(`http://localhost:3000/api/cart/add`, {
                method: "POST",
                body: JSON.stringify({
                    userId: token,
                    bookId: id
                }),
                headers: {
                    "Content-Type": "application/json",
                },

            })
                .then((req) => {
                    if (req.ok) {
                        console.log(req)
                    }
                })
                .then((data) => console.log(data))
        };
    }

    const toggleReview = (event) => {
        setPostReview(true)
    }

    const handleReview = (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target))

        fetch(`http://127.0.0.1:3000/api/review/${token}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPostReview(false)
                window.location.reload(false);
            });

    };

    useEffect(() => {
        fetch(`http://localhost:3000/api/review/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setReview(data)
            });
    }, [])

    const handleDelete = (id) => (event) => {
        event.preventDefault();

        fetch(`http://localhost:3000/api/review/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                console.log(data)
                window.location.reload(false);
            });
    };

    const changeEditStage = (event) => {
        setEditStage(true)
    }

    const handleEdit = (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target));
        console.log(data)

        fetch(`http://localhost:3000/api/review/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        })
            .then((response) => {
                if (response.status !== 200) {
                    alert("Invalid Information")
                }
                console.log(response.status)
                return response.json();
            })
            .then((data) => {
                console.log(data)
                // window.location.reload(false)
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log(state)
    }

    return (
        <>
            <br />
            <div className="">
                <img
                    className="object-cover w-300 h-200"
                    src={data.image}
                    alt={data.name}
                />
                <div className="pl-2">
                    <h4 className="text-l font-semibold tracking-tight text-blue-600">
                        {data.name}
                    </h4>
                    <br />
                    <p className="mb-2 leading-normal font-bold text-blue-300">
                        By {data.author}
                    </p>
                    <p className="mb-2 leading-normal font-bold">
                        Description
                    </p>
                    <p className="mb-2 leading-normal">
                        {data.description}
                    </p>
                    <p className="mb-2 leading-normal">
                        ${data.price}
                    </p>
                    <button
                        type="submit"
                        onClick={handleAddCart(data._id, token)}
                        className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow hover:bg-blue-600">
                        Add to Cart
                    </button>
                </div>
            </div>
            <br />
            <br />
            <br />
            {review.map((review, i) => (
                <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="text-xl mb-2 leading-normal font-bold">@{review.username}</p>
                        </div>
                        <div
                            className="z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            {token === review.idToken
                                ?
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <button
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white "
                                            onClick={changeEditStage}
                                        >
                                            Edit
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={handleDelete(review._id)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                </ul>
                                :
                                <br />}


                        </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">{review.review}</p>
                </article>
            ))}
            <br />
            <br />
            <br />
            {postReview === true
                ?
                <a></a>
                :
                <button
                    type="submit"
                    onClick={toggleReview}
                    className="absolute left-2 px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow hover:bg-blue-600">
                    Add a Review
                </button>
            }
            {postReview === true
                ?
                <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Review</h2>
                        </div>
                        <form method="POST" onSubmit={handleReview} className="mb-6">
                            <input name="username" className="text-transparent bg-transparent" value={username} readOnly></input>
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <textarea id="comment" name="review" rows="6"
                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    placeholder="Write a review..." required></textarea>
                            </div>
                            <input name="idToken" className="text-transparent bg-transparent" value={token} readOnly></input>
                            <input name="bookId" className="text-transparent bg-transparent" value={data._id} readOnly></input>
                            <button
                                type="submit"
                                className="flex px-4 py-2 text-m text-blue-100 bg-blue-500 rounded shadow hover:bg-blue-600">
                                Post comment
                            </button>
                        </form>
                    </div>
                </section>
                :
                <a></a>
            }
            {editStage === true
                ?
                <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Edit Review</h2>
                        </div>
                        <form method="POST" onSubmit={handleEdit} className="mb-6">
                            
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <textarea
                                    id="review"
                                    name="review"
                                    rows="6"
                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    value={state.review}
                                    onChange={handleChange}
                                    required>
                                    </textarea>
                            </div>
                            <button
                                type="submit"
                                className="flex px-4 py-2 text-m text-blue-100 bg-blue-500 rounded shadow hover:bg-blue-600">
                                Confirm Edit
                            </button>
                        </form>
                    </div>
                </section>
                :
                <br />}

        </>
    );
}
export default Details