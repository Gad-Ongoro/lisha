// components/Categories.js
import React from 'react';
import TopWaves from '../Shapers/TopWaves';

const Categories = () => {
  return (
    <section className="relative bg-emerald-500 py-10">
      <TopWaves />
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Explore Categories</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Fisheries</h3>
              <p>Explore the best seafood options from local fishermen.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Agriculture</h3>
              <p>Discover a variety of fresh produce from local farmers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;