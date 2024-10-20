'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../../services/utilities';
import { enqueueSnackbar } from 'notistack';
import { helix } from 'ldrs'
import api from '../../api';
import { NavLink } from 'react-router-dom';

helix.register()

export default function Cart() {
  const { user, products, cartOpen, setCartOpen, setCartItems, setCartItemsCount, currency, currencyExchangeRates, mergedCartItems, setMergedCartItems } = useAppContext();
  const [ subtotal, setSubtotal ] = useState(0);
  const [ loading, setLoading ] = useState(false);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await api.get('carts/');
        let items = response.data;

        // Sort items by datetime in descending order
        items = items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
        setCartItems(items);
  
        setMergedCartItems(items);
        calculateSubtotal(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        return Error(error);
      } finally {
        setLoading(false);
      }
    };
  
    if (user.id && cartOpen) {
      fetchCartItems();
    }
  }, [user.id, cartOpen, products, setCartItems, setMergedCartItems]);

  // Calculate subtotal whenever mergedCartItems changes
  useEffect(() => {
    calculateSubtotal(mergedCartItems);
  }, [mergedCartItems]);

  const calculateSubtotal = (items) => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
    setSubtotal(total.toFixed(2));
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setLoading(true);
      const response = await api.delete(`carts/${itemId}/`);
      if (response.status === 204) {
        enqueueSnackbar('Successfully removed item from cart!', { variant: 'success' });

        const updatedItems = mergedCartItems.filter((item) => item.id !== itemId);
        setMergedCartItems(updatedItems);
        setCartItemsCount(updatedItems.length);
        calculateSubtotal(updatedItems);
      };
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error removing item from cart:', error);
      enqueueSnackbar(`${error.response.data.detail}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const cartLoader = (
    <div className='flex items-center justify-center rotate-90'>
			<l-helix
				size="100"
				speed="2.5" 
				color="green" 
        className=""
			></l-helix>
		</div>
  );

  return (
    <>
      <Dialog open={cartOpen} onClose={setCartOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-1500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setCartOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {loading ? cartLoader : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {mergedCartItems.map((item) => (
                            <li key={item.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={item.product?.imageAlt || 'Product Image'}
                                  src={item.product?.image || '/placeholder-image.png'}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={item.product?.href}>{item.product?.name}</a>
                                    </h3>
                                    <p className="ml-4">
                                      {currency}
                                      {currency === 'KES' && <strong> {(item.total_price * currencyExchangeRates.KES).toFixed(2)}</strong>}
                                      {currency === 'USD' && <strong> {(item.total_price * currencyExchangeRates.USD).toFixed(2)}</strong>}
                                      {/* {currency} <strong>{item.total_price}</strong> */}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.product?.color}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {item.quantity}</p>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveItem(item.id)}
                                      className="font-medium text-orange-600 hover:text-orange-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        {currency}
                        { currency === 'KES' && <strong> {(subtotal * currencyExchangeRates.KES).toFixed(2)}</strong>}
                        { currency === 'USD' && <strong> {(subtotal * currencyExchangeRates.USD).toFixed(2)}</strong>}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <NavLink
                        to={`/account/${user.id}/lipa-na-mpesa`}
                        onClick={() => setCartOpen(false)}
                        className="flex items-center justify-center rounded-md border border-transparent bg-green-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-600"
                      >
                        Checkout
                      </NavLink>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <NavLink
                        to="/products/All"
                        className="font-medium text-green-600 hover:text-green-500"
                        onClick={() => setCartOpen(false)}
                      >
                        or{' '}
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}