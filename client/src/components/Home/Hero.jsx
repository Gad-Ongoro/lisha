import React from 'react';
import { NavLink } from 'react-router-dom';
import TopWaves from '../Shapers/TopWaves';
import BottomWaves from '../Shapers/BottomWaves';
import HeroCarousel from './HeroCarousel';
import { useAppContext } from '../../services/utilities';

const Hero = () => {
  const { auth } = useAppContext();
  return (
    <section className="relative h-10/12 md:flex bg-emerald-500 text-white rounded">
      <TopWaves />
      <BottomWaves />
      <div className='grid justify-center items-center overflow-hidden'>
        <HeroCarousel></HeroCarousel>
      </div>
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Fresh Supplies, Big Discounts</h1>
        <p className="text-xl mb-4">Discover fresh produce and seafood directly from local suppliers.</p>

        {
          !auth && (
            <NavLink to={'/account/signup'}>
              <button className="bg-white text-emerald-600 font-semibold py-2 px-4 rounded">Get Started</button>
            </NavLink>
          )
        }
      </div>
    </section>
  );
};

export default Hero;