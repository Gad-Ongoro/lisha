import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from 'notistack';
import { jwtDecode } from 'jwt-decode';
import { currencyConverter } from "./CurrencyConverter";
import api from "../api";

const appContext = createContext();

export const useAppContext = () => {
  return useContext(appContext);
};

export default function GOFoodsAppContext({ children }) {
	const navigate =  useNavigate();
	let { category } = useParams();
	const defaultCurrency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'KES';
	const defaultCurrencyExchangeRates = localStorage.getItem('currencyExchangeRates') ? JSON.parse(localStorage.getItem('currencyExchangeRates')) : {};
	const [ currencyExchangeRates, setCurrencyExchangeRates ] = useState(defaultCurrencyExchangeRates);
  const [ currency, setCurrency ] = useState(defaultCurrency);
	let [ products, setProducts ] = useState([]);
	const [ cartOpen, setCartOpen ] = useState(false);
	let [cartItems, setCartItems] = useState([]);
	let [ cartItemsCount, setCartItemsCount ] = useState(0);
	let [ cartSubTotal, setCartSubTotal ] = useState(0);
	const [ mergedCartItems, setMergedCartItems ] = useState([]);
	const [ mergedProductCartItems, setMergedProductCartItems ] = useState([]);
	const [ user, setUser ] = useState({});
	const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  const user_id = accessToken !== null || undefined ? jwtDecode(accessToken).user_id : null;
	const [ loading, setLoading ] = useState(false);
	const [auth, setAuth] = useState(false);

	// scroll to top
	const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

	// Google Login
	const googleLogin = async (credential) => {
		try {
			const response = await api.post("google/javascriptOAuthCallBack/", {credentials: credential});

			if (response.status === 200) {
				const user_id = jwtDecode(response.data.access).user_id;
				localStorage.setItem('access', response.data.access);
				localStorage.setItem('refresh', response.data.refresh);
				setAuth(true);
				enqueueSnackbar(`Successfully logged in`, { variant: 'success' });
				navigate(`/account/${user_id}/dashview`);
			} else {
				throw new Error("Error logging in");
			}
		} catch (error) {
			console.error(error);
			return error;
		} finally  {
			setLoading(false);
		}
	};

	// User Registration
	const userRegister = async (data) => {
		try {
			setLoading(true);
			const response = await api.post("users/register/", data);
			// console.log(response);
			if (response.status === 201) {
				localStorage.setItem('email', data.email);
				enqueueSnackbar(`Successfully registered`, { variant: 'success' });
				navigate('/account/otpverification');
			} else {
				throw new Error("Error registering user");
			}
		} catch (error) {
			console.error(error);
			if (error.response.data.email) {
				enqueueSnackbar(`${error.response.data.email}`, { variant: 'error' });
			} else {
				enqueueSnackbar(`${error.response.data.detail}`, { variant: 'error' });
			}
			return error;
		} finally {
			setLoading(false);
		}
	};

	// GET user
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

	// auth check
	useEffect( () => {
    if (accessToken) {
      setAuth(true);
      fetchUser();
    } else {
      setAuth(false);
    }
  }, [accessToken]);


	// GET products
	const getProducts = async () => {
		try {
			setLoading(true);
			const response = await api.get("products/");
			if (response.status === 200) {
				setProducts(response.data);
			} else {
				throw new Error("Error fetching products");
			}
			return response;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			setLoading(false);
		}
	};

	// GET scraped data
	const getScrapedData = async (category) => {
		switch (category) {
			case "Eggs & Dairy Products":
				category = 'liquid';
				break;

			case "Meat & Poultry": 
				category = 'frozen-foods';
				break;

			case "Grains & Cereals":
				category = 'pasta';
				break;
			
			case "All":
				category = 'all';
				break;
		}
		try {
			setLoading(true);
			const response = await api.get('scraper/scrape/', { params: {product: category} });
			if (response.status === 200) {
				const newProducts = response.data;

				const filteredNewProducts = newProducts.filter(newProduct => 
					!products.some(existingProduct => existingProduct.name === newProduct.name)
				);

				setProducts(current => [...current, ...filteredNewProducts]);
			} else {
				throw new Error("Error fetching products");
			}
			return response;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			setLoading(false);
		}
	}

	// GET cart items
	const getCartItems = async () => {
		try {
			const response = await api.get("carts/");
			if (response.status === 200) {
				let items = response.data;
				setCartItemsCount(items.length);

				// Sort items by datetime in descending order
				items = items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

				// calculate subtotal
				let totalCost = Math.ceil(items.reduce((sum, item) => sum + parseFloat(item.total_price), 0));
				setCartSubTotal(totalCost);

				setCartItems(items);
				setMergedProductCartItems(items);
			} else {
				throw new Error("Error fetching cart items");
			};
			return response;
		} catch (error) {
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

	// GET products
	useEffect(() => {
		getProducts();
	}, []);

	const contextValues = {
		navigate, refreshToken, scrollToTop,
		loading, setLoading,
		googleLogin, userRegister,
		products,
		getProducts, getScrapedData,
		cartItems, setCartItems,
		mergedCartItems, setMergedCartItems,
		cartItemsCount, setCartItemsCount,
		cartSubTotal,
		user_id, user, setUser,
		auth, setAuth,
		fetchUser,
		cartOpen, setCartOpen, getCartItems,
		currency, setCurrency, currencyExchangeRates
	};

	return (
		<appContext.Provider value={contextValues}>
			{children}
		</appContext.Provider>
	);
}