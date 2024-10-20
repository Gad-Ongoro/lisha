import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { MdShoppingCartCheckout } from "react-icons/md";
import Carousel from 'react-multi-carousel';
import { useAppContext } from '../../services/utilities';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const CarouselItem = ({item}) => {
	return(
		<div className='grid justify-center items-center h-40 w-full transition-all duration-500 hover:scale-105'>
			<div className='grid justify-center items-center'>
				<img src={item.product.image} alt={item.product.name} className='rounded-lg h-40 w-40 object-cover' />
			</div>
			<div className='bg-green-200 rounded-lg mt-1 text-cente'>
				<p className='text-gray-900 text-center'><strong>{item.product.name}</strong></p>
			</div>
		</div>
	)
};

const CartCarousel = ({cartItems}) => {
	return(
		<Carousel
			swipeable={true}
			draggable={false}
			responsive={responsive}
			ssr={true}
			infinite={true}
			autoPlaySpeed={200}
			keyBoardControl={true}
			transitionDuration={200}
			containerClass="carousel-container"
			dotListClass="custom-dot-list-style"
			itemClass="carousel-item-padding-40-px"
			className='grid gap-x-2 transition-all rounded-lg h-60 z-0'
		>
			{cartItems.map((item, index) => (
				<CarouselItem key={index} item={item} />
			))}
		</Carousel>
	)
};

const CartMiniInfo = () => {
  const { user_id, getCartItems, cartItems, cartItemsCount, cartSubTotal, setCartOpen, currency } = useAppContext();
	// console.log(cartItems);
	useEffect(() => {
		getCartItems();
	}, []);

  return (
    <>
			<div className='col-span-12 text-center rounded-xl mt-5'>
				<div>
					<div>
						<h2 className='text-emerald-500 text-lg font-bold'>My Cart</h2>
						<h3 className='text-lg text-gray-500'>{cartItemsCount} {cartItemsCount === 1 ? 'Item' : 'Items'}</h3>
					</div>
				</div>

				<div className='flex justify-around'>
					<div>
						<h2 className='text-lg'>Total Cost</h2>
						
						<NavLink to={`/account/${user_id}/lipa-na-mpesa`}>
							<button className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'>Checkout <MdShoppingCartCheckout className='inline ml-1' size={20} /></button>
						</NavLink>
					</div>
					<div>
						<p>{currency}. <strong>{cartSubTotal}</strong></p>
						<button 
							onClick={() => setCartOpen(true)}
							className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'
						>
							Show All 
							<FaArrowRightLong className='inline ml-1' />
						</button>
					</div>
				</div>

				<div>
					<CartCarousel cartItems={cartItems}></CartCarousel>
				</div>

				<div className='flex justify-center mt-2'>
					<button
						onClick={() => setCartOpen(true)}
						className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'
					>
						Show All
						<FaArrowRightLong className='inline ml-1' />
					</button>
				</div>
			</div>
    </>
  )
}

export default CartMiniInfo;