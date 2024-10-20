'use client';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Header/NavBar';
import HomeDrawer from '../Home/HomeDrawer';
import { enqueueSnackbar } from 'notistack';
import { useAppContext } from '../../services/utilities';
import AnimatedXPage from '../Animations/AnimatedXPage';
import HelixUIBall from '../Loaders/HelixUIBall';
import api from '../../api';

export default function ProductPage() {
	const params = useParams();
	const { loading, setLoading, setCartOpen, mergedCartItems, setCartItemCount, user, products, currency, currencyExchangeRates } = useAppContext();
	const product = products.filter((product) => product.id === params.product_id)[0];
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const total_price = (parseFloat(product.price) * selectedQuantity).toFixed(2);
      const response = await api.post('add-to-cart/', {
        user: user.id,
        product: product.id,
        quantity: selectedQuantity,
        total_price,
      });

      if (response.status === 201) {
        setCartOpen(true);
        setCartItemCount(mergedCartItems.length + 1);
        enqueueSnackbar(`${product.name} added to cart successfully!`, { variant: 'success' });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      enqueueSnackbar(`Failed to add product to cart: ${error?.response?.data?.detail} `, { variant: 'warning' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <AnimatedXPage> 
      <HomeDrawer />
      <div className="bg-white">
        { loading || (product === undefined || null) ? (<HelixUIBall />) :
        (
        <>
          <div className="">
            <h1 className="text-2xl text-center font-bold tracking-tight text-gray-900 sm:text-3xl">Product: {product.name}</h1>
          </div>
          <div className="pt-6 md:grid md:grid-cols-2 md:gap-x-8">
            
            {/* Image gallery */}
            <div className="mx-auto mt-4">
              <div className="flex justify-center items-center">
                <img
                  alt={product.name}
                  src={product.image}
                  className="w-64 h-64 object-cover object-center rounded-lg"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto px-2">

              <div className="w-10/12">
                <h2 className="sr-only">Product information</h2>
                <p className="mt-2 text-xl text-gray-700"><strong>Category: </strong>{product.category}</p>
                <p className="mt-2 text-xl text-gray-700"><strong>Description: </strong>{product.description}</p>
                <p className="mt-2 text-xl text-gray-700">
                  {
                    currency === 'KES' && <span><strong>Price: </strong>{currency} <strong>{(product.price * currencyExchangeRates.KES).toFixed(2)}</strong></span>
                  }
                  {
                    currency === 'USD' && <span><strong>Price: </strong>{currency} <strong>{(product.price * currencyExchangeRates.USD).toFixed(2)}</strong></span>
                  }
                  
                </p>
                <p className="mt-2 text-xl text-gray-700"><strong>Quantity Available:</strong> {product.quantity_available} {product.unit_of_measurement}s</p>
                {/* <p className="mt-2 text-xl text-gray-700"><strong>Perishable:</strong> {product.perishable ? 'Yes' : 'No'}</p> */}
                {/* {product.perishable && <p className="mt-2 text-xl text-gray-700"><strong>Expiration Date:</strong> {product.expiration_date}</p>} */}

                <form>
                  {/* Quantity */}
                  <fieldset className="mt-4">
                    <legend className="text-sm font-medium text-gray-900">Quantity</legend>
                    <div className="mt-2 flex items-center space-x-3">
                      <input
                        type="number"
                        min="1"
                        max={product.quantity_available}
                        value={selectedQuantity}
                        onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                        className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </fieldset>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-8 py-3 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                </form>
              </div>

            </div>
          </div>
        </>)}
      </div>
      </AnimatedXPage>
    </>
  )
};