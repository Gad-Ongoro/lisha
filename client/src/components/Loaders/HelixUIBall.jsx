import React from 'react'
import { helix } from 'ldrs'

helix.register()

function HelixUIBall() {
  return (
    <div className='flex items-center justify-center rotate-90'>
			<l-helix
				size="100"
				speed="2.5" 
				color="green" 
			></l-helix>
		</div>
  )
};

export default HelixUIBall;