import { useState, useEffect, createContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ClientDash from './components/DashBoard/ClientDash';
import GoogleMaps from './components/Maps/GoogleMaps';
import UserType from './components/Auth/UserType';
import ClientSignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import PasswordResetRequest from './components/Auth/PswdRstReq';
import PasswordResetConfirm from './components/Auth/PswdRstCnfrm';
export const AppContext = createContext();

function App() {
  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const accessToken = localStorage.getItem('access');
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (accessToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [accessToken]);

  return (
    <div>
      <AppContext.Provider value={{ auth, setAuth, snackBarOpen, setSnackBarOpen }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<GoogleMaps />} />
          <Route path="/account/usertype" element={<UserType />} />
          <Route path="/account/signup" element={<ClientSignUp />} />
          <Route path="/account/signin" element={<SignIn />} />
          <Route path="/password/reset" element={<PasswordResetRequest />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />} />
          <Route path="/clientdash/*" element={<ClientDash />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
