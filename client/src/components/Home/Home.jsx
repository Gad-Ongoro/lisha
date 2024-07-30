import React, { useState } from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import HomeDrawer from './HomeDrawer';
import AnimatedYPage from '../AnimatedYPage';
import InViewAnimation from '../Animations/InViewAnimation';
import NavBar from '../Header/NavBar';
import Hero from './Hero';
import Features from './Features';
import Categories from './Categories';
import ShipmentInfo from './ShipmentInfo';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from '../Footer';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      <NavBar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HomeDrawer mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <AnimatedYPage>
        <Hero />
        <InViewAnimation><Features /></InViewAnimation>
        <InViewAnimation><Categories /></InViewAnimation>
        <InViewAnimation><ShipmentInfo /></InViewAnimation>
        <InViewAnimation><Testimonials /></InViewAnimation>
        <InViewAnimation><CTA /></InViewAnimation>
        <Footer />
      </AnimatedYPage>
    </div>
  );
};

export default Home;
