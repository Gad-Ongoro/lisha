import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../Header/NavBar';
import ProductQuickView from './ProductQuickView';
import AnimatedXPage from '../AnimatedXPage';
import api from "../../api";
import { AppContext } from '../../App';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
	const { productQuickViewOpen, setProductQuickViewOpen } = useContext(AppContext);
	const [selectedProduct, setSelectedProduct] = useState(null);

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

	const handleProductClick = (product) => {
		setSelectedProduct(product);
		setProductQuickViewOpen(true);
	};

  return (
		<>
			<NavBar />
			{selectedProduct && <ProductQuickView product={selectedProduct} />}
			<AnimatedXPage>
				<div className="bg-white">
					<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
						<h2 className="sr-only">Products</h2>

						<div className="grid justify-center grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
							{products.map((product) => (
								<div key={product.id} onClick={() => handleProductClick(product)} className="group grid justify-center items-center cursor-pointer">
									<div className="grid justify-center items-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
										<img
											alt='NA'
											src={product.image}
											className="h-48 w-48 object-cover object-center rounded-lg group-hover:opacity-75"
										/>
									</div>
									<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
									<p className="mt-1 font-medium text-gray-900"><strong>Category: </strong>{product.category}</p>
									<p className="mt-1 font-medium text-gray-900"><strong>Price: </strong> {product.price} per {product.unit_of_measurement}</p>
									<p className="mt-1 font-medium text-gray-900"><strong>Stock: </strong> {product.quantity_available} {product.unit_of_measurement}s</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</AnimatedXPage>
		</>
  );
}