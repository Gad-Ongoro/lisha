import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

function HeroCarousel() {
  return (
		<Carousel
			swipeable={false}
			draggable={false}
			// showDots={true}
			responsive={responsive}
			ssr={true}
			infinite={true}
			autoPlay={true}
			autoPlaySpeed={1500}
			keyBoardControl={true}
			// customTransition="all 1"
			transitionDuration={2000}
			containerClass="carousel-container"
			removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
			// deviceType={this.props.deviceType}
			dotListClass="custom-dot-list-style"
			itemClass="carousel-item-padding-40-px"
			className='w-96 transition-all rounded-lg'
		>
			<div className='grid justify-center items-center'>
				<img src="images/w1.png" alt="Lisha" className='h-60' />
			</div>
			<div className='grid justify-center items-center'>
				<img src="images/w2.png" alt="Lisha" className='h-60' />
			</div>
			{/* <div className='grid justify-center items-center'>
				<img src="images/w3.png" alt="Lisha" className='h-60' />
			</div> */}
			<div className='grid justify-center items-center'>
				<img src="images/w4.png" alt="Lisha" className='h-60' />
			</div>
		</Carousel>
	);
};

export default HeroCarousel;