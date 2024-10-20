import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopWaves from '../Shapers/TopWaves';
import BottomWaves from '../Shapers/BottomWaves';
import RightScreenViewItem from '../Animations/RightScreenViewItem';
import { TbShoppingBag } from "react-icons/tb";
import { useAppContext } from '../../services/utilities';

function ShipmentInfo() {
  const navigate = useNavigate();
  const { getScrapedData, getProducts } = useAppContext();

  return (
    <section className='relative bg-red-50'>
      <TopWaves />
      <BottomWaves />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='flex flex-col items-start justify-center w-4/5 mx-auto p-1 m-1 gap-2 z-20'>
          <h3 className='text-4xl text-emerald-600 font-bold'>We ship on the following day from 10:00AM - 8:00PM</h3>
          <p className='text-xl text-emerald-900 font-semibold'>Free for orders above $20.00</p>
          <div 
            onClick={() => {
              navigate('/products/Fruits');
              window.scrollTo(0, 0);
            }} 
            className='flex justify-center items-center gap-2 transition-all duration-300 text-white font-bold bg-orange-400 hover:bg-orange-500 rounded-full p-2 w-40'>
            <TbShoppingBag size={25} />
            <button type='button' className=''>Order Now</button>
          </div>
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