import React from 'react';

function Settings() {
	return (
		<div className='container'>
			<div className=''>
				<div className='m-1'>
					<h2 className='text-4xl my-2'>Settings</h2>
				</div>

				<div className='rounded-lg border-1 mt-3 mb-4 p-1 border-gray-500'>
					<h2 className='text-2xl mt-2'>Notifications</h2>
					<p className='mb-3'>Manage notifications</p>
					<hr />
					<div className='grid grid-cols-2 justify-center mt-3'>
						<div className=''>
							<h3 className='text-lg my-2'>Email</h3>
							<div className='flex items-center'>
								<input type="checkbox" checked></input>
								<p className='mx-1'>Product Updates</p>
							</div>

							<div className='flex items-center'>
								<input type="checkbox" checked></input>
								<p className='mx-1'>Security Updates</p>
							</div>
						</div>

						<div className=''>
							<h3 className='text-lg my-2'>Phone</h3>
							<div className='flex items-center'>
								<input type="checkbox" checked></input>
								<p className='mx-1'>Product Updates</p>
							</div>

							<div className='flex items-center'>
								<input type="checkbox"></input>
								<p className='mx-1'>Security Updates</p>
							</div>
						</div>
					</div>

					<hr className='mt-3' />

					<div className='text-right'>
						<button className='text-white text-lg font-bold bg-green-500 hover:bg-green-600 h-10 w-36 mt-2 rounded-lg'>Save</button>
					</div>
				</div>

				<div className='rounded-lg border-1 mb-5 p-1 border-gray-500'>
					<h2 className='text-2xl mt-2'>Password</h2>
					<p className='mb-3'>Update Password</p>
					<hr />

					<div className="form-floating mt-3 mb-3 ml-2 w-10/12 md:w-1/2 text-dark">
						<input type="password" className="form-control" id="password" placeholder="Enter password" name="password"></input>
						<label htmlFor="password">Password</label>
					</div>

					<div className="form-floating mt-3 mb-3 ml-2 w-10/12 md:w-1/2 text-dark">
						<input type="password" className="form-control" id="confirm_password" placeholder="Enter password" name="password"></input>
						<label htmlFor="confirm_password">Confirm Password</label>
					</div>

					<hr className='mt-3' />
					<div className='text-right'>
						<button className='text-white text-lg font-bold bg-green-500 hover:bg-green-600 h-10 w-36 mt-2 rounded-lg'>Update</button>
					</div>

				</div>
			</div>
		</div>
	)
};

export default Settings;