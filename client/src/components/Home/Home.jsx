import React from 'react';
import Header from '../Header';
import Hero from './Hero';
import Features from './Features';
import Categories from './Categories';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from '../Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Categories />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
