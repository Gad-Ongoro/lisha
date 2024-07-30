import React from 'react';
import TopWaves from '../Shapers/TopWaves';
import BottomWaves from '../Shapers/BottomWaves';
import RightScreenViewItem from '../Animations/RightScreenViewItem';

function ShipmentInfo() {
  return (
    <section className='relative bg-red-50'>
      <TopWaves />
      <BottomWaves />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='flex flex-col items-start justify-center p-1 m-1 gap-2 z-10'>
          <h3 className='text-4xl text-emerald-600 font-bold'>We ship on the following day from 10:00AM - 8:00PM</h3>
          <p className='text-xl text-emerald-900'>For orders placed before 10:00AM above $20.00</p>
          <button type='button' className='font-bold bg-orange-400 transition-all duration-300 hover:bg-orange-500 text-white py-2 px-4 rounded w-1/2'>Order Now</button>
        </div>

        <RightScreenViewItem>
          <div className='grid justify-center items-center'>
            <img src="images/shipment_img.png" alt="NA" className='w-96 h-96 z-10'/>
          </div>
        </RightScreenViewItem>

      </div>
    </section>
  )
};

export default ShipmentInfo;