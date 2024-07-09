import React from 'react';
import AnimatedYPage from '../AnimatedYPage';
import NavBar from '../NavBar';
import Hero from './Hero';
import Features from './Features';
import Categories from './Categories';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from '../Footer';

const Home = () => {
  return (
    <div>
      <AnimatedYPage>
        <NavBar />
        <Hero />
        <Features />
        <Categories />
        <Testimonials />
        <CTA />
        <Footer />
      </AnimatedYPage>
    </div>
  );
};

export default Home;
