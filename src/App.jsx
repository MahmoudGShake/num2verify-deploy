import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Profile from './pages/profile';
import About from './pages/about';
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import ActivateAccount from './pages/ActivateAccount';
import ProtectedRoute from './ProtectedRoute';
import Numberlist from './pages/Numberlist';

function App() {
  return (
    <>
    <BrowserRouter>
        <AppAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<ProtectedRoute checkType={'IsLoggedIn'} > <SignIn /> </ProtectedRoute> } />
          <Route path="/signup" element={<ProtectedRoute checkType={'IsLoggedIn'}> <SignUp /> </ProtectedRoute>} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<ProtectedRoute checkType={'IsNotLoggedIn'}> <Profile /> </ProtectedRoute>} />
          <Route path="/activate" element={<ActivateAccount />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/numberlist" element={<Numberlist/>}/>
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
