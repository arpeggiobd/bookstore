import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddBook from './Components/AddBook'
import AddImage from './Components/AddImage'
import Cart from './Components/Cart'
import Details from './Components/Details'
import Home from './Components/Home'
import Profile from './Components/Profile'
import SellerRole from './Components/SellerRole'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import Navbar from './Layout/Navbar'
import LoggedInRoute from './PrivateRoute/LoggedInRoute'
import PrivateRoute from './PrivateRoute/PriavteRoute'
import SellerRoute from './PrivateRoute/SellerRoute'


function App() {
  const token = JSON.parse(localStorage.getItem('token'));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='/' element={<Home />} />
            <Route path='/details' element={<Details/>} />
            {/*Prevent logged in to go to register or login page*/}
            <Route path='/' element={<LoggedInRoute />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
            </Route>
            {/*Non-logged in to go to register or login page*/}
            <Route path='/' element={<PrivateRoute />} >
              <Route path='/profile' element={<Profile />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/' element={<SellerRoute />}>
                <Route path='/addlist' element={<AddBook />} />
                <Route path='/addimage' element={<AddImage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
