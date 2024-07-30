'use client'

import { useState, useContext } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { enqueueSnackbar } from 'notistack';
import { AppContext } from '../../App';
import api from '../../api';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductQuickView({ product }) {
  const { productQuickViewOpen, setProductQuickViewOpen, user } = useContext(AppContext);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const {
    id,
    name,
    description,
    category,
    price,
    quantity_available,
    unit_of_measurement,
    perishable,
    expiration_date,
    image,
  } = product;

  const handleAddToCart = async () => {
    try {
      const total_price = (parseFloat(price) * selectedQuantity).toFixed(2);
      await api.post('carts/', {
        user: user.id,
        product: id,
        quantity: selectedQuantity,
        total_price,
      });
      enqueueSnackbar(`Product added to cart successfully!`, { variant: 'success' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      enqueueSnackbar(`Failed to add product to cart: ${error.response.data.detail} `, { variant: 'warning' });
    }
  };

  return (
    <Dialog open={productQuickViewOpen} onClose={() => setProductQuickViewOpen(false)} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setProductQuickViewOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img alt={name} src={image} className="object-cover object-center" />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{name}</h2>

                  <section aria-labelledby="information-heading" className="mt-2">
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900">{price}</p>
                    <p className="mt-4 text-sm text-gray-700">{description}</p>
                    <p className="mt-2 text-sm text-gray-700"><strong>Category:</strong> {category}</p>
                    <p className="mt-2 text-sm text-gray-700"><strong>Quantity Available:</strong> {quantity_available} {unit_of_measurement}</p>
                    <p className="mt-2 text-sm text-gray-700"><strong>Perishable:</strong> {perishable ? 'Yes' : 'No'}</p>
                    {perishable && <p className="mt-2 text-sm text-gray-700"><strong>Expiration Date:</strong> {expiration_date}</p>}
                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form>
                      {/* Quantity */}
                      <fieldset className="mt-4">
                        <legend className="text-sm font-medium text-gray-900">Quantity</legend>
                        <div className="mt-2 flex items-center space-x-3">
                          <input
                            type="number"
                            min="1"
                            max={quantity_available}
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
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
};