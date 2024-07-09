import { useState, useEffect, createContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import GoogleMaps from './components/Maps/GoogleMaps';
import ClientSignUp from './components/Auth/ClientSignUp';
import SignIn from './components/Auth/SignIn';
export const AppContext = createContext();

function App() {
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
    <div className="bg-gray-900 h-screen">
      <AppContext.Provider value={{ auth, setAuth }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/map" element={<GoogleMaps />} />
          <Route path="/clientsignup" element={<ClientSignUp />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
