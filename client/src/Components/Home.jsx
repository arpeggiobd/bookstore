import { React, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";



function Home() {
    const [data, setData] = useState([])
    const [userRole, setUserRole] = useState('')
    const navigate = useNavigate();

    const id = JSON.parse(localStorage.getItem('tokenid'));
    const token = JSON.parse(localStorage.getItem('tokenid'));

    console.log

    useEffect(() => {
        fetch("http://localhost:3000/api/book", {
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
        if (id === null) {
            console.log('id is null')
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

    const handleBookDetails = (event) => {
        console.log(event.target.id)
        navigate('/details', { state: event.target.id })
    }

    return (
        <>
            <br />
            <div className="grid gap-2 lg:grid-cols-4">
                {data.map((book, i) => (
                    <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={i}>
                        <img
                            className="object-cover w-300 h-200 px-10"
                            src={book.image}
                            alt={book.name}
                            id={book._id}
                            onClick={handleBookDetails}
                        />
                        <div className="p-4 px-10">
                            <h4
                                id={book._id}
                                className="text-l font-semibold text-blue-600 hover:underline"
                                onClick={handleBookDetails}
                            >
                                {book.name}
                            </h4>
                            <p className="mb-2 leading-normal">
                                ${book.price}
                            </p>
                            <br />
                            <button
                                type="submit"
                                onClick={handleAddCart(book._id, token)}
                                className="px-4 py-2 text-sm text-blue-100 bg-blue-400 rounded shadow hover:bg-blue-600" >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home