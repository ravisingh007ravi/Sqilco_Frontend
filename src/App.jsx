import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import {
  Navbar, Home, LogIn, SignUp, About, PageNotFound, Contact,
  Services, Setting, Profile, OtpVerification, Fotoer, AdminHome
} from './AllComponents';
import { AuthProvider } from './components/Contexts/AuthContext';

export default function App() {
  const [otpverify, setOtpVerify] = React.useState(true);

  return (
    <AuthProvider>   
      <BrowserRouter>
      <Navbar />
      <MainRoutes otpverify={otpverify} setOtpVerify={setOtpVerify} />
    </BrowserRouter>
    </AuthProvider>

  );
}

function MainRoutes({ otpverify, setOtpVerify }) {
  const location = useLocation();

  const privateRoutes = ['/otpverification', '/adminHome','/setting'];

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
        <Route path='/contact' element={<Contact />} />
        <Route path='/*' element={<PageNotFound />} />

        {/* Private Routes */}
        <Route element={<PrivateOtpRoute />}>
          <Route path='/otpverification/:type/:id' element={<OtpVerification />} />
          <Route path='/adminHome' element={<AdminHome />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/setting' element={<Setting />} />
        </Route>
      </Routes>

      {!isPrivateRoute && <Fotoer />}
    </>
  );
}
