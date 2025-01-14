import React from 'react';
import GoogleMaps from '../Maps/GoogleMaps';
import LeftScreenViewItem from '../Animations/LeftScreenViewItem';
import RightScreenViewItem from '../Animations/RightScreenViewItem';

function CTA() {
  return (
    <div className='relative'>
			<div className='grid sm:flex justify-around items-center bg-gray-100 w-full'>
				<LeftScreenViewItem>
					<div className='grid justify-center items-center'>
						<img src="images/GOFoods_mobile.png" alt="Mobile App" width={200} height={100} />
						<p className='text-gray-500 font-bold'>Scan code to download the app</p>
					</div>
				</LeftScreenViewItem>

				<RightScreenViewItem>
					<GoogleMaps />
				</RightScreenViewItem>
			</div>
    </div>
  )
};

export default CTA;