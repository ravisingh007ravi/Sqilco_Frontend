import React from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import {
  Navbar, Home, LogIn, SignUp, About, PageNotFound, Contact,
  Services, Setting, Profile, OtpVerification, Fotoer
} from './AllComponents'

export default function App() {

  const [otpverify, setOtpVerify] = React.useState(true);
  const PrivateOtpRoute = ({ otpverify }) => {
    return otpverify ? <Outlet /> : <Navigate replace to="/" />;
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp setOtpVerify={setOtpVerify} />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Services />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/*' element={<PageNotFound />} />


        {/* Private Routes */}
        <Route element={<PrivateOtpRoute otpverify={otpverify} />}>
          <Route path='/otpverification/:id' element={<OtpVerification />} />
        </Route>

      </Routes>
      <Fotoer />
    </BrowserRouter>
  )
}
