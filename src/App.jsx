import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Home, LogIn, SignUp, About, PageNotFound, Contact, 
  Services, Setting, Profile, OtpVerification } from './AllComponents'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Services />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/otpverification/:id' element={<OtpVerification />} />
        <Route path='/*' element={<PageNotFound />} />

      </Routes>

    </BrowserRouter>
  )
}
