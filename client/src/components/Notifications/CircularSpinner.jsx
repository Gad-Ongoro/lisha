import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function CircularSpinner() {
  return (
    <div className='flex gap-x-6 justify-center items-center h-screen'>
			<CircularProgress />
			<CircularProgress />
			<CircularProgress />
    </div>
  )
}

export default CircularSpinner;