import { useState, useEffect, createContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import DashHome from './components/DashBoard/DashHome';
import GoogleMaps from './components/Maps/GoogleMaps';
import UserType from './components/Auth/UserType';
import SignUp from './components/Auth/SignUp';
import OTPVerification from './components/Auth/OTPVerification';
import MpesaPayment from './components/DashBoard/MpesaPayment';
import SignIn from './components/Auth/SignIn';
import PasswordResetRequest from './components/Auth/PswdRstReq';
import PasswordResetConfirm from './components/Auth/PswdRstCnfrm';
export const AppContext = createContext();

function App() {
  const navigate = useNavigate();
  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  const user_id = accessToken !== null || undefined ? jwtDecode(accessToken).user_id : null;
  const [auth, setAuth] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    if (accessToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [accessToken]);

  return (
    <div>
      <AppContext.Provider value={{ navigate, accessToken, refreshToken, auth, setAuth, user_id, snackBarOpen, setSnackBarOpen, scrollToTop }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<GoogleMaps />} />
          <Route path="/account/usertype" element={<UserType />} />
          <Route path="/account/signup" element={<SignUp />} />
          <Route path="/account/otpverification" element={<OTPVerification />} />
          <Route path="/account/signin" element={<SignIn />} />
          <Route path="/lipa-na-mpesa" element={<MpesaPayment />} />
          <Route path="/password/reset" element={<PasswordResetRequest />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />} />
          <Route path="/account/:user/*" element={<DashHome />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
