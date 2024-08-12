import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Header/NavBar';
import HomeDrawer from '../Home/HomeDrawer';
import ProductQuickView from './ProductQuickView';
import AnimatedXPage from '../AnimatedXPage';
import { AppContext } from '../../App';

export default function ProductsPage() {
  const { productQuickViewOpen, setProductQuickViewOpen, products, setProducts, currency, currencyExchangeRates } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { category } = useParams();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductQuickViewOpen(true);
  };

  const filteredProducts = category.toLowerCase() === 'all' 
    ? products 
    : products.filter((product) => product.category.toLowerCase() === category.toLowerCase());

  return (
    <>
      <NavBar />
      <HomeDrawer />
      {selectedProduct && <ProductQuickView product={selectedProduct} />}
      <AnimatedXPage>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
						<h2 className='text-center text-3xl font-bold mb-3 tracking-tight text-gray-900'>Products: {category}</h2>

            <div className="grid justify-center grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group grid justify-center items-center cursor-pointer">
                  <div onClick={() => handleProductClick(product)} className="grid justify-center items-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      alt='NA'
                      src={product.image}
                      className="h-48 w-48 object-cover object-center rounded-lg hover:scale-105 transform transition duration-500 ease-in-out"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 font-medium text-gray-900"><strong>Category: </strong>{product.category}</p>
                  <p className="mt-1 font-medium text-gray-900"><strong>Price: </strong> {currency}
                    {
                      currency === 'KES' && <strong> {(product.price * currencyExchangeRates.KES).toFixed(2)} </strong>
                    }
                    {
                      currency === 'USD' && <strong> {(product.price * currencyExchangeRates.USD).toFixed(2)} </strong>
                    }
                    per {product.unit_of_measurement}
                  </p>
                  <p className="mt-1 font-medium text-gray-900"><strong>Stock: </strong> {product.quantity_available} {product.unit_of_measurement}s</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedXPage>
    </>
  );
};