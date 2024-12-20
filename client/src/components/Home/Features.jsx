import React from 'react';
import TopWaves from '../Shapers/TopWaves';
import BottomWaves from '../Shapers/BottomWaves';

const Features = () => {
  return (
    <section className="relative bg-gray-100 py-16">
      <TopWaves />
      <BottomWaves />
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl text-emerald-600 font-bold mb-6">Our Features</h2>
        <div className="flex flex-wrap">
          <div className="w-full bg-green-100 md:w-1/3 px-4 mb-8 border overflow-hidden" style={{ borderRadius: `40% 60% 54% 46% / 35% 40% 68% 65%` }}>
            <div className="p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2">Fresh Food</h3>
              <p>Get the freshest catch directly from fishermen.</p>
              <div className='w-full grid justify-center items-center'>
                <img className='h-56 w-56 object-cover rounded-lg' src="https://i.pinimg.com/564x/3a/fb/57/3afb57fe10ae19b29f982c7efc3984ab.jpg" alt="Sea Foods" />
              </div>
            </div>
          </div>
          <div className="w-full bg-green-100 md:w-1/3 px-4 mb-8 border overflow-hidden" style={{ borderRadius: `40% 60% 54% 46% / 35% 40% 68% 65%` }}>
            <div className="p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2">Organic Produce</h3>
              <p>Buy organic fruits and vegetables from local farmers.</p>
              <div className='w-full grid justify-center items-center'>
                <img className='h-56 w-56 object-cover rounded-lg' src="https://i.pinimg.com/474x/56/0e/fa/560efa36c00b3f25ec8fab0fd58a13a9.jpg" alt="Organic Produce" />
              </div>
            </div>
          </div>
          <div className="w-full bg-green-100 md:w-1/3 px-4 mb-8 border overflow-hidden" style={{ borderRadius: `40% 60% 54% 46% / 35% 40% 68% 65%` }}>
            <div className="p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2">Direct Connection</h3>
              <p>Connect directly with suppliers for the best deals.</p>
              <div className='w-full grid justify-center items-center'>
                <img className='h-56 w-56 object-cover rounded-lg' src="https://i.pinimg.com/564x/1d/17/59/1d175940952975e82dfac015711c6b03.jpg" alt="Marketing" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;