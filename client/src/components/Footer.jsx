import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-6">
        <div className='flex justify-around'>
          <div>
            <div className='flex items-center m-1 p-1'>
              <CiLocationOn className='text-2xl font-bold m-1' />
              <p>Tudor, Mombasa</p>
            </div>
            <div className='flex items-center m-1 p-1'>
              <BiSupport className='text-xl m-1' />
              <p>+254712345678</p>
            </div>
            <div className='flex items-center m-1 p-1'>
              <FiMail className='text-xl m-1' />
              <p>gofoods@gmail.com</p>
            </div>
            <div className='flex items-center m-1 p-1'>
              <FaRegClock className='text-xl m-1' />
              <p>Mon - Fri, 08:00 - 19:00</p>
            </div>
          </div>

          <div>
            <h3 className='font-semibold'>Account</h3>
            <p className='text-gray-400'>Products</p>
            <p className='text-gray-400'>Cart</p>
            <p className='text-gray-400'>Orders</p>
            <p className='text-gray-400'>Contact Us</p>
            <p className='text-gray-400'>Help</p>
          </div>

          <div>
            <h3 className='font-semibold'>Company</h3>
            <p className='text-gray-400'>About Us</p>
            <p className='text-gray-400'>Privacy Policy</p>
            <p className='text-gray-400'>Terms & Conditions</p>
            <p className='text-gray-400'>Careers</p>
          </div>

          <div>
            <h3 className='font-semibold'>Follow Us</h3>
            <p className='text-gray-400'>Facebook</p>
            <p className='text-gray-400'>Twitter</p>
            <p className='text-gray-400'>Instagram</p>
            <p className='text-gray-400'>LinkedIn</p>
          </div>

          <div>
            <h3 className='font-semibold'>Payment Methods</h3>
            <p className='text-gray-400'>Mpesa</p>
            <p className='text-gray-400'>Visa</p>
            <p className='text-gray-400'>MasterCard</p>
            <p className='text-gray-400'>PayPal</p>
          </div>

        </div>
        <p className='text-center text-gray-600 my-1'>© 2024 GoFoods. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;