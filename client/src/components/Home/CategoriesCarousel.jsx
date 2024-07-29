import React, { useContext} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
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

function CategoriesCarousel() {
	const {  setProductCategory } = useContext(AppContext);
  return (
		<Carousel
			swipeable={true}
			draggable={false}
			// showDots={true}
			responsive={responsive}
			ssr={true}
			infinite={true}
			// autoPlay={true}
			autoPlaySpeed={200}
			keyBoardControl={true}
			// customTransition="all 1"
			transitionDuration={200}
			containerClass="carousel-container"
			// removeArrowOnDeviceType={["tablet", "mobile"]}
			// deviceType={this.props.deviceType}
			dotListClass="custom-dot-list-style"
			itemClass="carousel-item-padding-40-px"
			className='transition-all rounded-lg m-2 h-56'
		>
			<NavLink to={'/products/vegetables'} onClick={() => setProductCategory('vegetables')} style={{ textDecoration: 'none' }}>
				<div className='grid justify-center items-center h-40 w-full transition-all duration-500 hover:scale-105'>
					<div className='grid justify-center items-center'>
						<img src="https://i.pinimg.com/474x/3b/2e/0a/3b2e0aaaab07d3962e096d0e62955af8.jpg" alt="Lisha" className='h-40 w-40 rounded' />
					</div>
					<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Vegetables</strong></p>
				</div>
			</NavLink>

			<NavLink to={'/products/fruits'} onClick={() => setProductCategory('fruits')} style={{ textDecoration: 'none' }}>
				<div className='grid justify-center items-center h-40 w-full transition-all duration-500 hover:scale-105'>
					<div>
						<img src="https://i.pinimg.com/564x/bb/03/17/bb03178a6cc29282538aea436ab3792c.jpg" alt="Lisha" className='h-40 w-40 rounded' />
					</div>
					<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Fruits</strong></p>
				</div>
			</NavLink>

			<NavLink to={'/products/eggs'} onClick={() => setProductCategory('eggs')} style={{ textDecoration: 'none' }}>
				<div className='grid justify-center items-center h-40 w-full transition-all duration-500 hover:scale-105'>
					<div>
						<img src="https://i.pinimg.com/474x/db/b0/30/dbb0304ef70a5bc223eb41b4324b9feb.jpg" alt="Lisha" className='h-40 w-40 rounded' />
					</div>
					<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Eggs</strong></p>
				</div>
			</NavLink>

			<NavLink to={'/products/fish&seafood'} onClick={() => setProductCategory('fish')} style={{ textDecoration: 'none' }}>
				<div className='grid justify-center items-center h-40 w-full transition-all duration-500 hover:scale-105'>
					<div>
						<img src="https://i.pinimg.com/564x/a3/18/3e/a3183e363358309ec737feba214a6387.jpg" alt="Lisha" className='h-40 w-40 rounded' />
					</div>
					<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Fish</strong></p>
				</div>
			</NavLink>

			<NavLink to={'/products/meat&poultry'} onClick={() => setProductCategory('meat&poultry')} style={{ textDecoration: 'none' }}>
				<div className='grid justify-center items-center h-40 w-full transition-all duration-500 hover:scale-105'>
					<div>
						<img src="https://i.pinimg.com/564x/18/a6/19/18a619689671fb274960b0de90952424.jpg" alt="Lisha" className='h-40 w-40 rounded' />
					</div>
					<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Meat & Poultry</strong></p>
				</div>
			</NavLink>

			<NavLink to={'/products/grains&cereals'} onClick={() => setProductCategory('grains&cereals')} style={{ textDecoration: 'none' }}>
				<div className='grid justify-center items-center h-40 w-full transition-all duration-500 hover:scale-105'>
					<div>
						<img src="https://i.pinimg.com/474x/6b/ed/89/6bed89214464a04999dd29bd0d679849.jpg" alt="Lisha" className='h-40 w-40 rounded' />
					</div>
					<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Grains & Cereals</strong></p>
				</div>
			</NavLink>

			<NavLink to={'/products/beeproducts'} onClick={() => setProductCategory('bee_products')} style={{ textDecoration: 'none' }}>
				<div className='grid justify-center items-center h-40 w-full transition-all duration-500 hover:scale-105'>
					<div>
						<img src="https://i.pinimg.com/564x/69/b6/d6/69b6d69e63c70710035edf2ee427f441.jpg" alt="Lisha" className='h-40 w-40 rounded' />
					</div>
					<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Bee Products</strong></p>
				</div>
		</NavLink>

			<NavLink to={'/products/dairyproducts'} onClick={() => setProductCategory('dairy_products')} style={{ textDecoration: 'none' }}>
				<div className='grid justify-center items-center h-40 w-full transition-all duration-500 hover:scale-105'>
					<div>
						<img src="https://i.pinimg.com/474x/18/bc/8b/18bc8b7979f0e32ec022a5597b7bc8b7.jpg" alt="Lisha" className='h-40 w-40 rounded' />
					</div>
					<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Dairy Products</strong></p>
				</div>
		</NavLink>
		</Carousel>
	);
};

export default CategoriesCarousel;