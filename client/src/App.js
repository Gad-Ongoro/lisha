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
import SignIn from './components/Auth/SignIn';
import PasswordResetRequest from './components/Auth/PswdRstReq';
import PasswordResetConfirm from './components/Auth/PswdRstCnfrm';
import ProductsPage from './components/Products/ProductsPage';
import api from './api';
export const AppContext = createContext();

function App() {
  const navigate = useNavigate();
  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  const user_id = accessToken !== null || undefined ? jwtDecode(accessToken).user_id : null;
  const [ user, setUser ] = useState({});
  const [auth, setAuth] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function fetchUser() {
		try {
				const res = await api.get(`users/${user_id}/`);
			 if (res.status === 200) {
				 	setUser(res.data);
			 }
		}
		catch (error) {
			console.error(error);
		}
	};

  useEffect( () => {
    if (accessToken) {
      setAuth(true);
      fetchUser();
    } else {
      setAuth(false);
    }
  }, [accessToken]);

  return (
    <div>
      <AppContext.Provider value={{ navigate, accessToken, refreshToken, auth, setAuth, user_id, user, snackBarOpen, setSnackBarOpen, scrollToTop }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<GoogleMaps />} />
          <Route path="/account/usertype" element={<UserType />} />
          <Route path="/account/signup" element={<SignUp />} />
          <Route path="/account/otpverification" element={<OTPVerification />} />
          <Route path="/account/signin" element={<SignIn />} />
          <Route path="/password/reset" element={<PasswordResetRequest />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />} />
          <Route path="/account/:user/*" element={<DashHome />} />
          <Route path="/products/*" element={<ProductsPage />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
