import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import {
  Navbar, Home, LogIn, SignUp, About, PageNotFound, Contact,
  Services, Setting, Profile, OtpVerification, Fotoer, AdminHome, HomeTest
} from './AllComponents';

export default function App() {
  const [otpverify, setOtpVerify] = React.useState(true);

  return (
    <BrowserRouter>
      <Navbar />
      <MainRoutes otpverify={otpverify} setOtpVerify={setOtpVerify} />
    </BrowserRouter>
  );
}

function MainRoutes({ otpverify, setOtpVerify }) {
  const location = useLocation();

  // Define private routes
  const privateRoutes = ['/otpverification', '/adminHome'];

  // Check if the current route is private
  const isPrivateRoute = privateRoutes.some(route => location.pathname.startsWith(route));

  const PrivateOtpRoute = () => {
    return otpverify ? <Outlet /> : <Navigate replace to="/" />;
  };

  return (
    <>
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
        <Route path='/HomeTest' element={<HomeTest />} />

        {/* Private Routes */}
        <Route element={<PrivateOtpRoute />}>
          <Route path='/otpverification/:id' element={<OtpVerification />} />
          <Route path='/adminHome' element={<AdminHome />} />
        </Route>
      </Routes>

      {!isPrivateRoute && <Fotoer />}
    </>
  );
}
