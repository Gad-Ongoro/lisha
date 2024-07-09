import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { FaArrowRightLong } from "react-icons/fa6";
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { RxHamburgerMenu } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiStarOutline } from "react-icons/ti";

function DashView() {
	return (
		<div className='container grid grid-cols-12'>
		<div className='col-span-12 md:col-span-8'>
			<div>
				<h2 className='text-lg my-2 font-bold'>Recent Purchases</h2>
				<div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
					<div className='flex justify-center'>
						<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' src="https://i.pinimg.com/474x/85/12/05/8512057135f1b2c8bf2a0d64bd50873b.jpg" alt="NA" width={200} />
					</div>
					<div className='flex justify-center'>
						<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' src="https://i.pinimg.com/474x/d3/24/34/d3243406515221f17b30f8101e370d3f.jpg" alt="NA" width={200} />
					</div>
					<div className='flex justify-center'>
						<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' src="https://i.pinimg.com/474x/56/0e/fa/560efa36c00b3f25ec8fab0fd58a13a9.jpg" alt="NA" width={200} />
					</div>
				</div>
			</div>
			<div>
				<div className='flex flex-col align-center rounded bg-gray-300 my-5 text-center overflow-auto'>
					<h2 className='text-gray-900 text-lg font-bold'>Changes Chart</h2>
					<BarChart
						series={[
							{ data: [3, 4, 1, 6, 5], stack: 'A', label: 'Series A1' },
							{ data: [4, 3, 1, 5, 8], stack: 'A', label: 'Series A2' },
							{ data: [4, 2, 5, 4, 1], stack: 'B', label: 'Series B1' },
							{ data: [2, 8, 1, 3, 1], stack: 'B', label: 'Series B2' },
							{ data: [10, 6, 5, 8, 9], label: 'Series C1' },
						]}
						width={600}
						height={350}
					/>
				</div>
				<div>
					<h2>Contacts List</h2>
				</div>
			</div>
		</div>

		<div className='col-span-12 md:col-span-4 text-center rounded-xl mt-5'>
			<div>
				<div>
					<h2 className='text-green-500 text-lg'>My Cards</h2>
					<p>4 Active Cards</p>
				</div>
			</div>

			<div className='flex justify-around'>
				<div>
					<h2 className='text-lg'>Total Balance</h2>
					
					<button className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'>Transfer <CompareArrowsIcon className='inline ml-1' /></button>
				</div>
				<div>
					<p>$5,060.99</p>
					<button className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'>Withdraw <InstallMobileIcon  className='inline ml-1' /></button>
				</div>
			</div>
			<div className='grid grid-cols-12 items-center mt-2'>
				<div className='col-start-1 col-end-2 flex justify-center'>
					<RxHamburgerMenu className='text-xl transition-all duration-500 hover:cursor-pointer hover:text-green-300' />
				</div>
				<div className='col-start-2 col-end-11'>
					<img src="https://i.pinimg.com/474x/13/8a/b4/138ab4f0cef7ed70d580d0248f4b1ab4.jpg" className='rounded' alt="NA" />
				</div>
				<div className='col-start-11 col-end-13'>
					<div className='flex flex-col justify-between items-center'>
						<CiEdit className='my-2 text-2xl transition-all duration-500 hover:cursor-pointer hover:text-green-300' />
						<RiDeleteBin5Line className='my-2 text-orange-700 text-2xl transition-all duration-300 hover:cursor-pointer hover:text-orange-600' />
						<TiStarOutline className='my-2 text-2xl transition-all duration-500 hover:cursor-pointer hover:text-green-300' />
					</div>
				</div>
			</div>
			<div className='grid grid-cols-12 items-center mt-2'>
				<div className='col-start-1 col-end-2 flex justify-center'>
					<RxHamburgerMenu className='text-xl transition-all duration-500 hover:cursor-pointer hover:text-green-300' />
				</div>
				<div className='col-start-2 col-end-11'>
					<img src="https://i.pinimg.com/564x/e6/eb/56/e6eb563a0af57973d37e2c2e42b69e6a.jpg" className='rounded' alt="NA" />
				</div>
				<div className='col-start-11 col-end-13'>
					<div className='flex flex-col justify-between items-center'>
						<CiEdit className='my-2 text-2xl transition-all duration-500 hover:cursor-pointer hover:text-green-300' />
						<RiDeleteBin5Line className='my-2 text-orange-700 text-2xl transition-all duration-300 hover:cursor-pointer hover:text-orange-600' />
						<TiStarOutline className='my-2 text-2xl transition-all duration-500 hover:cursor-pointer hover:text-green-300' />
					</div>
				</div>
			</div>
			<div className='flex justify-center mt-2'>
				<button className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'>Show All <FaArrowRightLong className='inline ml-1' /></button>
			</div>
		</div>
	</div>
	)
};

export default DashView;