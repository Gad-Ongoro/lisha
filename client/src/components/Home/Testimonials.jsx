import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import TopWaves from '../Shapers/TopWaves';
import BottomWaves from '../Shapers/BottomWaves';
import { FaStar } from "react-icons/fa6";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const testimonials = [
  {
    rating: 4,
    text: "I've been using this app for a few months now and I can't imagine going back to the grocery store. The app is easy to use and I love it.",
    name: 'Wayne Mahir',
    imgSrc: 'https://i.pinimg.com/474x/aa/29/51/aa29513a29196803f09d43ad017e77e1.jpg',
  },
  {
    rating: 5,
    text: "An excellent tool for daily shopping. Saves me a lot of time and effort.",
    name: 'Sarah Johnson',
    imgSrc: 'https://i.pinimg.com/474x/96/a8/37/96a837555d2f8954d4091c34316494ae.jpg',
  },
  {
    rating: 3,
    text: "It's okay, but I wish there were more features for personalized recommendations.",
    name: 'Michael Smith',
    imgSrc: 'https://i.pinimg.com/474x/33/2e/41/332e41c719c62fcea7b05ae67f4c9fc0.jpg',
  },
  {
    rating: 4,
    text: "Great experience overall. I would recommend it to my friends.",
    name: 'Emily Davis',
    imgSrc: 'https://i.pinimg.com/474x/66/d3/7d/66d37d99262f49217f3decf27b87e51c.jpg',
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className='flex text-yellow-500'>
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar key={index} className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className='relative bg-emerald-500 py-10 rounded-b-xl'>
      <TopWaves />
      <BottomWaves />
      <Carousel
        swipeable={true}
        draggable={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass='carousel-container'
        dotListClass='custom-dot-list-style'
        itemClass='carousel-item-padding-40-px'
        className='transition-all rounded-lg m-2 z-0'
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className='flex flex-col justify-center items-center text-center w-1/2 mx-auto'>
            <StarRating rating={testimonial.rating} />
            <div className='mt-4'>
              <p className='text-gray-900 text-lg font-bold'>{`"${testimonial.text}"`}</p>
            </div>
            <div className='mt-4'>
              <div className='grid justify-center items-center'>
                <img src={testimonial.imgSrc} alt={`Photo of ${testimonial.name}`} className='h-20 w-20 object-cover rounded-full' />
              </div>
              <p className='font-bold mt-2'>{testimonial.name}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Testimonials;