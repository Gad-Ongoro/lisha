import zIndex from '@mui/material/styles/zIndex';
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

function CategoriesCarousel() {
  return (
		<Carousel
			swipeable={false}
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
			removeArrowOnDeviceType={["tablet", "mobile"]}
			// deviceType={this.props.deviceType}
			dotListClass="custom-dot-list-style"
			itemClass="carousel-item-padding-40-px"
			className='transition-all rounded-lg m-2 h-56'
		>
			<div className='grid justify-center items-center h-40 w-40'>
				<div>
					<img src="https://i.pinimg.com/474x/3b/2e/0a/3b2e0aaaab07d3962e096d0e62955af8.jpg" alt="Lisha" className='h-40 w-40 rounded' />
				</div>
				<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Vegetables</strong></p>
			</div>

			<div className='grid justify-center items-center h-40 w-40'>
				<div>
					<img src="https://i.pinimg.com/564x/bb/03/17/bb03178a6cc29282538aea436ab3792c.jpg" alt="Lisha" className='h-40 w-40 rounded' />
				</div>
				<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Fruits</strong></p>
			</div>

			<div className='grid justify-center items-center h-40 w-40'>
				<div>
					<img src="https://i.pinimg.com/474x/db/b0/30/dbb0304ef70a5bc223eb41b4324b9feb.jpg" alt="Lisha" className='h-40 w-40 rounded' />
				</div>
				<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Eggs</strong></p>
			</div>

			<div className='grid justify-center items-center h-40 w-40'>
				<div>
					<img src="https://i.pinimg.com/564x/a3/18/3e/a3183e363358309ec737feba214a6387.jpg" alt="Lisha" className='h-40 w-40 rounded' />
				</div>
				<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Seafood</strong></p>
			</div>

			<div className='grid justify-center items-center h-40 w-40'>
				<div>
					<img src="https://i.pinimg.com/564x/18/a6/19/18a619689671fb274960b0de90952424.jpg" alt="Lisha" className='h-40 w-40 rounded' />
				</div>
				<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Meat & Poultry</strong></p>
			</div>

			<div className='grid justify-center items-center h-40 w-40'>
				<div>
					<img src="https://i.pinimg.com/474x/6b/ed/89/6bed89214464a04999dd29bd0d679849.jpg" alt="Lisha" className='h-40 w-40 rounded' />
				</div>
				<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Grains & Cereals</strong></p>
			</div>

			<div className='grid justify-center items-center h-40 w-40'>
				<div>
					<img src="https://i.pinimg.com/564x/69/b6/d6/69b6d69e63c70710035edf2ee427f441.jpg" alt="Lisha" className='h-40 w-40 rounded' />
				</div>
				<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Bee Products</strong></p>
			</div>

			<div className='grid justify-center items-center h-40 w-40'>
				<div>
					<img src="https://i.pinimg.com/474x/18/bc/8b/18bc8b7979f0e32ec022a5597b7bc8b7.jpg" alt="Lisha" className='h-40 w-40 rounded' />
				</div>
				<p className='text-gray-900 bg-green-200 rounded-lg mt-1'><strong>Dairy Products</strong></p>
			</div>
		</Carousel>
	);
};

export default CategoriesCarousel;