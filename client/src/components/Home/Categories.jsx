import React from 'react';
import CategoriesCarousel from './CategoriesCarousel';
import TopWaves from '../Shapers/TopWaves';
import BottomWaves from '../Shapers/BottomWaves';
import { px } from 'framer-motion';

const Categories = () => {
  return (
    <section className="relative  py-10">
      <TopWaves />
      <BottomWaves />
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Explore Categories</h2>
        <CategoriesCarousel />
      </div>
    </section>
  );
};

export default Categories;