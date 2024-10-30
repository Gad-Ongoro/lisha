import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAppContext } from '../../services/utilities';
import { NavLink } from 'react-router-dom';

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

const categories = [
  { name: 'Vegetables', imgSrc: 'https://i.pinimg.com/474x/3b/2e/0a/3b2e0aaaab07d3962e096d0e62955af8.jpg' },
  { name: 'Fruits', imgSrc: 'https://i.pinimg.com/564x/bb/03/17/bb03178a6cc29282538aea436ab3792c.jpg' },
  { name: 'Eggs & Dairy Products', imgSrc: 'https://i.pinimg.com/474x/db/b0/30/dbb0304ef70a5bc223eb41b4324b9feb.jpg' },
  { name: 'Fish & Seafood', imgSrc: 'https://i.pinimg.com/564x/a3/18/3e/a3183e363358309ec737feba214a6387.jpg' },
  { name: 'Meat & Poultry', imgSrc: 'https://i.pinimg.com/564x/18/a6/19/18a619689671fb274960b0de90952424.jpg' },
  { name: 'Grains & Cereals', imgSrc: 'https://i.pinimg.com/474x/6b/ed/89/6bed89214464a04999dd29bd0d679849.jpg' },
  { name: 'Bee Products', imgSrc: 'https://i.pinimg.com/564x/69/b6/d6/69b6d69e63c70710035edf2ee427f441.jpg' },
  { name: 'Yoghurts', imgSrc: 'https://i.pinimg.com/474x/18/bc/8b/18bc8b7979f0e32ec022a5597b7bc8b7.jpg' },
];

function CarouselItem({ category }) {
  const { getScrapedData, scrollToTop } = useAppContext();
  return (
    <NavLink 
      to={`/products/${category.name}`} 
      style={{ textDecoration: 'none' }}
      onClick={
        () => {
          getScrapedData(category.name);
          scrollToTop();
        }
      }
    >
      <div className='grid justify-center items-center h-40 w-full transition-all duration-500 hover:scale-105'>
        <div className='grid justify-center items-center'>
          <img src={category.imgSrc} alt={category.name} className='h-40 w-40 rounded' />
        </div>
        <p className='text-gray-900 text-center bg-green-200 rounded-lg mt-1'><strong>{category.name}</strong></p>
      </div>
    </NavLink>
  );
}

function CategoriesCarousel() {

  return (
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
      className='transition-all rounded-lg m-2 h-56 z-0'
    >
      {categories.map((category, index) => (
        <CarouselItem key={index} category={category} />
      ))}
    </Carousel>
  );
}

export default CategoriesCarousel;