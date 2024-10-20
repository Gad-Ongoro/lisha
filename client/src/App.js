import { useState, useEffect, createContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import DashHome from './components/DashBoard/DashHome';
import Marketplace from './components/Marketplace/Marketplace';
import Contact from './components/Contact/Contact';
import UserType from './components/Auth/UserType';
import SignUp from './components/Auth/SignUp';
import OTPVerification from './components/Auth/OTPVerification';
import SignIn from './components/Auth/SignIn';
import PasswordResetRequest from './components/Auth/PswdRstReq';
import PasswordResetConfirm from './components/Auth/PswdRstCnfrm';
import ProductsPage from './components/Products/ProductsPage';
import ProductPage from './components/Products/ProductPage';
import Cart from './components/Cart/Cart';
import SearchModal from './components/Header/SearchModal';
import { useAppContext } from './services/utilities';
export const AppContext = createContext();

function App() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAppContext();
  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
  const [ productCategory, setProductCategory ] = useState('');
  const [ searchModalOpen, setSearchModalOpen ] = useState(false);
  const [ productQuickViewOpen, setProductQuickViewOpen ] = useState(false);

  return (
    <div>
      <AppContext.Provider value={{ navigate,
          auth, snackBarOpen, setSnackBarOpen,
          productCategory, setProductCategory,
          productQuickViewOpen, setProductQuickViewOpen,
          mobileMenuOpen, setMobileMenuOpen,
          searchModalOpen, setSearchModalOpen
         }}
      >
        {
          auth && <Cart />
        }
        <SearchModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/usertype" element={<UserType />} />
          <Route path="/account/signup" element={<SignUp />} />
          <Route path="/account/otpverification" element={<OTPVerification />} />
          <Route path="/account/signin" element={<SignIn />} />
          <Route path="/password/reset" element={<PasswordResetRequest />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />} />
          <Route path="/account/:user/*" element={<DashHome />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/products/:category/:product_id" element={<ProductPage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
