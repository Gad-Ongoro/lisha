import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { RiDeleteBin3Line } from "react-icons/ri";
import AnimatedXPage from '../Animations/AnimatedXPage';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { enqueueSnackbar } from 'notistack';
import CategoriesCarousel from '../Home/CategoriesCarousel';
import CartMiniInfo from './CartMiniInfo';
import { useAppContext } from '../../services/utilities';

function DashView() {
	const { getCartItems, user_id } = useAppContext();
	const navigate = useNavigate();
	const [ads, setAds] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

	React.useEffect(() => {
		getCartItems();
	}, []);

	// get products
	React.useEffect(() => {
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

	// delete products
	const handleDeleteProduct = async (productId) => {
		try {
			const response = await api.delete(`products/${productId}/`);
			if (response.status === 204) {
				navigate(`/account/${user_id}/ads`);
				enqueueSnackbar('Product deleted successfully', { variant: 'success' });
			}
		} catch (error) {
			console.error('Error deleting product:', error);
		}
	}

	return (
		<AnimatedXPage>
			<div className='container grid grid-cols-12'>
			<div className='col-span-12'>
				<div>
					<h2 className='text-lg text-green-700 my-2 font-bold'>Recently Added</h2>
					<div className=''>
						<CategoriesCarousel></CategoriesCarousel>
					</div>
				</div>
				<div>
					<div className='hidden flex flex-col align-center rounded bg-gray-300 my-5 text-center overflow-auto'>
						<h2 className='text-gray-900 text-lg font-bold'>Changes Chart</h2>
						<BarChart
							series={[
								{ data: [3, 4, 1, 6, 5], stack: 'A', label: 'Vegetables and Fruits' },
								{ data: [4, 3, 1, 5, 8], stack: 'A', label: 'Meat and Poultry' },
								{ data: [4, 2, 5, 4, 1], stack: 'B', label: 'Series B1' },
								{ data: [2, 8, 1, 3, 1], stack: 'B', label: 'Series B2' },
								{ data: [10, 6, 5, 8, 9], label: 'Series C1' },
							]}
							width={800}
							height={350}
						/>
					</div>

				</div>
			</div>
			<CartMiniInfo></CartMiniInfo>
		</div>
	</AnimatedXPage>
	)
};

export default DashView;