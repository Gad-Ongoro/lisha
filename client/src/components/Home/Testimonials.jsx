import React from 'react';
import BottomWaves from '../Shapers/BottomWaves';

const Testimonials = () => {
  return (
    <section className="relative bg-emerald-500 py-10 rounded-b-xl">
      <BottomWaves />
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">"The seafood is always fresh and the service is excellent!"</p>
              <h3 className="text-xl font-semibold">- John Doe</h3>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">"I love buying organic vegetables from this platform."</p>
              <h3 className="text-xl font-semibold">- Jane Smith</h3>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">"Connecting with local suppliers has never been easier."</p>
              <h3 className="text-xl font-semibold">- Sarah Lee</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;