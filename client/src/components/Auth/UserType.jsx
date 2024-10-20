import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../Header/NavBar';
import AnimatedYPage from '../Animations/AnimatedYPage';
import AnimatedXPage from '../Animations/AnimatedXPage';
import { FaUser } from "react-icons/fa";

function UserType() {
  return (
		<>
			<NavBar />
			<AnimatedXPage>
			<div className='h-screen grid justify-center items-center'>
				<div className='p-4 border rounded-lg'>
					<div className=''>
						<h2 className="text-center text-xl font-bold mb-2">Choose your account type</h2>
						<p className='text-center mb-4 text-gray-500'>This will help us to provide you with a more relevant experience</p>	
					</div>

					<div className='flex justify-around items-center gap-4'>
						<div 
							className='transition-all duration-300 hover:text-emerald-600 hover:scale-105'
							onClick={() => {localStorage.setItem('accountType', 'buyer')}}
						>
							<NavLink to={'/account/signup'} className='flex items-center justify-center'><FaUser className='text-orange-500 text-3xl mr-2'/>Buyer</NavLink>
						</div>
						<div 
							className='transition-all duration-300 hover:text-emerald-600 hover:scale-105'
							onClick={() => {localStorage.setItem('accountType', 'seller')}}
						>
							<NavLink to={'/account/signup'} className='flex items-center justify-center'><FaUser className='text-emerald-500 text-3xl mr-2'/>Seller</NavLink>
						</div>
					</div>
				</div>
			</div>
			</AnimatedXPage>
		</>
  )
};

export default UserType;