import React, { useState, useEffect, useContext } from 'react';
import AnimatedXPage from '../Animations/AnimatedXPage';
import api from '../../api';
import { enqueueSnackbar } from 'notistack';
import HelixUIBall from '../Loaders/HelixUIBall';
import { jwtDecode } from 'jwt-decode';
import { AppContext } from '../../App';

const categories = [
  'Vegetables',
  'Fruits',
  'Eggs',
  'Fish & Seafood',
  'Meat & Poultry',
  'Grains & Cereals',
  'Bee Products',
  'Dairy Products',
];

const unitsOfMeasurement = {
  Vegetables: ['Kilograms (kg)', 'Grams (g)', 'Bunch', 'Piece'],
  Fruits: ['Kilograms (kg)', 'Grams (g)', 'Dozen', 'Piece'],
  Eggs: ['Tray', 'Dozen', 'Piece'],
  'Fish & Seafood': ['Kilograms (kg)', 'Grams (g)', 'Piece', 'Dozen'],
  'Meat & Poultry': ['Kilograms (kg)', 'Grams (g)', 'Piece'],
  'Grains & Cereals': ['Kilograms (kg)', 'Grams (g)', 'Sack'],
  'Bee Products': ['Grams (g)', 'Kilograms (kg)', 'Jar', 'Piece'],
  'Dairy Products': ['Liters (L)', 'Milliliters (ml)', 'Kilograms (kg)', 'Grams (g)', 'Piece'],
};

const ProductCreate = () => {
  const { user_id, navigate } = useContext(AppContext);
  const [ loading, setLoading ] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity_available: '',
    unit_of_measurement: '',
    perishable: false,
    expiration_date: '',
    image: null,
  });

  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (formData.category) {
      setUnits(unitsOfMeasurement[formData.category]);
    } else {
      setUnits([]);
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access');
    let userId = null;
    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.user_id;
    }

    const uploadData = new FormData();
    for (const key in formData) {
      uploadData.append(key, formData[key]);
    }

    if (userId) {
      uploadData.append('user', userId);
    }

    try {
      setLoading(true);
      const response = await api.post('products/create/', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        navigate(`/account/${user_id}/ads`);
        enqueueSnackbar('Product created successfully', { variant: 'success' });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    };
  };

  return (
    <AnimatedXPage>
      <div className="max-w-xl mx-auto mt-10 p-4 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">New Product Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
					<div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

					<div>
            <label className="block text-sm font-medium text-gray-700">Unit of Measurement</label>
            <select
              name="unit_of_measurement"
              value={formData.unit_of_measurement}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">Select a unit</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Price per Unit of Measurement</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount in Stock / Available Units</label>
            <input
              type="number"
              name="quantity_available"
              value={formData.quantity_available}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Perishable</label>
            <input
              type="checkbox"
              name="perishable"
              checked={formData.perishable}
              onChange={handleChange}
              className="mt-1 block px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
            <input
              type="date"
              name="expiration_date"
              value={formData.expiration_date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className={`${loading && 'cursor-not-allowed'} ${loading && 'disabled'} inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              Make a post
            </button>
            {
              loading && (<HelixUIBall></HelixUIBall>)
            }
          </div>
        </form>
      </div>
    </AnimatedXPage>
  );
};

export default ProductCreate;