import React, { useState, useEffect, useContext } from 'react';
import CircularSpinner from '../Notifications/CircularSpinner';
import api from "../../api";
import { AppContext } from '../../App';

const Ads = () => {
	const { user_id } = useContext(AppContext);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get('products/');
        const userAds = response.data.filter(product => product.user === user_id);
        setAds(userAds);
      } catch (error) {
        setError('Error fetching ads');
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) return <CircularSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-semibold mb-4">My Ads</h2>

        <div className="h-screen grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {ads.map((ad) => (
            <div key={ad.id} className="group grid justify-center items-center">
              <div className="grid justify-center items-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={ad.imageAlt || ad.name}
                  src={ad.image || 'https://via.placeholder.com/150'}
                  className="h-48 w-48 object-cover object-center rounded-lg group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{ad.name}</h3>
							<p className="mt-1 font-medium text-gray-900"><strong>Category: </strong>{ad.category}</p>
							<p className="mt-1 font-medium text-gray-900"><strong>Price: </strong> {ad.price} per {ad.unit_of_measurement}</p>
							<p className="mt-1 font-medium text-gray-900"><strong>Stock: </strong> {ad.quantity_available} {ad.unit_of_measurement}s</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ads;