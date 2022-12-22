import { React, useEffect, useState } from "react"
import { RiContactsBookLine } from "react-icons/ri";

function Cart() {
    const [data, setData] = useState([])

    const id = JSON.parse(localStorage.getItem('tokenid'));

    useEffect(() => {
        fetch(`http://localhost:3000/api/cart/all/${id}`, {
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

    const handleDelete = (id) => () => {
        fetch(`http://localhost:3000/api/cart/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((req) => {
            if (req.ok){
              setData(data.filter((del) => del._id !== id ));
            }
          })
          .then((data) => console.log(data));
      };


    return (
        <>
            <br />
            <div className="grid gap-2 lg:grid-cols-4">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 -600 lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-black-700 uppercase ">
                        Shopping Cart
                    </h1>
                    {data.map((book, i) => (
                        <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={i}>

                            <img
                                className="object-cover w-300 h-200 px-10"
                                src={book.bookId.image}
                                alt={book.bookId.name}
                            />
                            <div className="p-4 px-10">
                                <h4
                                    className="text-l font-semibold text-blue-600 hover:underline"
                                >
                                    {book.bookId.name}
                                </h4>
                                <p className="mb-2 leading-normal">
                                    ${book.bookId.price}
                                </p>
                                <br />
                                <button 
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-900 "
                                onClick={handleDelete(book._id)}
                                >
                                    Remove from Cart
                                    </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cart