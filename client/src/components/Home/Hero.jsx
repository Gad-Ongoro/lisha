import React from 'react';
import TopWaves from '../Shapers/TopWaves';
import BottomWaves from '../Shapers/BottomWaves';
import HeroCarousel from './HeroCarousel';

const Hero = () => {
  return (
    <section className="relative md:flex bg-emerald-500 text-white rounded">
      <TopWaves />
      <BottomWaves />
      <div>
        <HeroCarousel></HeroCarousel>
      </div>
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Connecting Small-Scale Farmers and Fishermen to Markets</h1>
        <p className="text-xl mb-4">Discover fresh produce and seafood directly from local suppliers.</p>
        <button className="bg-white text-emerald-600 font-semibold py-2 px-4 rounded">Get Started</button>
      </div>
    </section>
  );
};

export default Hero;