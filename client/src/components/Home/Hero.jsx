import React from 'react';

const Hero = () => {
  return (
    <section className="bg-blue-500 text-white">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Connecting Fishermen and Farmers</h1>
        <p className="text-xl mb-4">Discover fresh produce and seafood directly from local suppliers.</p>
        <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded">Get Started</button>
      </div>
    </section>
  );
};

export default Hero;