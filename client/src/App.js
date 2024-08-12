import { useState, useEffect, createContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import DashHome from './components/DashBoard/DashHome';
import UserType from './components/Auth/UserType';
import SignUp from './components/Auth/SignUp';
import OTPVerification from './components/Auth/OTPVerification';
import SignIn from './components/Auth/SignIn';
import PasswordResetRequest from './components/Auth/PswdRstReq';
import PasswordResetConfirm from './components/Auth/PswdRstCnfrm';
import ProductsPage from './components/Products/ProductsPage';
import ProductPage from './components/Products/ProductPage';
import Cart from './components/Cart/Cart';
import api from './api';
import { currencyConverter } from './services/CurrencyConverter';
export const AppContext = createContext();

function App() {
  const navigate = useNavigate();
  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
  const [ productCategory, setProductCategory ] = useState('');
  const [ cartOpen, setCartOpen ] = useState(false);
  const [ products, setProducts ] = useState([]);
  const [ productQuickViewOpen, setProductQuickViewOpen ] = useState(false);
  const defaultCurrency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'KES';
  const [ currency, setCurrency ] = useState(defaultCurrency);
  const defaultCurrencyExchangeRates = localStorage.getItem('currencyExchangeRates') ? JSON.parse(localStorage.getItem('currencyExchangeRates')) : {};
  const [ currencyExchangeRates, setCurrencyExchangeRates ] = useState(defaultCurrencyExchangeRates);
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

  // currency conversion
  useEffect(() => {
    const currency = localStorage.getItem('currency');
    if ((currency === null) || (currency === undefined)) {
      localStorage.setItem('currency', 'KES');
    }
    const fetchCurrencyExchangeRates = async () => {
      try {
        const response = await currencyConverter();
        setCurrencyExchangeRates(response.conversion_rates);
        localStorage.setItem('currencyExchangeRates', JSON.stringify(response.conversion_rates));
      } catch (error) {
        console.error('Error fetching currency exchange rates:', error);
      }
    }

    if (defaultCurrencyExchangeRates.KES === undefined || defaultCurrencyExchangeRates.KES === null) {
      fetchCurrencyExchangeRates();
    }
  }, [currency]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
      <AppContext.Provider value={{ navigate, accessToken, refreshToken,
          auth, setAuth, user_id, user, snackBarOpen, setSnackBarOpen, scrollToTop, 
          cartOpen, setCartOpen, productCategory, setProductCategory,
          productQuickViewOpen, setProductQuickViewOpen, currency, currencyExchangeRates, setCurrency,
          mobileMenuOpen, setMobileMenuOpen,
          products, setProducts
         }}
      >
        {
          (auth && cartOpen && user.role === 'buyer') && <Cart />
        }
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
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
