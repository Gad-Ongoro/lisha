import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TbSmartHome } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DashContext } from './ClientDash';
import { AppContext } from '../../App';

export default function DashDrawer() {
	const { dashDrawerOpen, setDashDrawerOpen } = useContext(DashContext);
	const { scrollToTop } = useContext(AppContext);

	const handleNavClick = () => {
		scrollToTop();
		setDashDrawerOpen(false);
	}

  return (
    <Dialog open={dashDrawerOpen} onClose={setDashDrawerOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setDashDrawerOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Gad Ongoro</DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
									<div className='grid'>
										<NavLink to={'/'} className={'flex items-center gap-2'} onClick={handleNavClick}>
											<TbSmartHome className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30}/>
											<span>Home</span>
										</NavLink>
										<NavLink to={'/clientdash/dashview'} className={'flex items-center gap-2'} onClick={handleNavClick}>
											<CgProfile className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
											<span>Profile</span>
										</NavLink>
										<NavLink to={'/clientdash/notifications'} className={'flex items-center gap-2'} onClick={handleNavClick}>
											<IoNotificationsOutline className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
											<span>Notifications</span>
										</NavLink>
										<NavLink to={'/clientdash/favorites'} className={'flex items-center gap-2'} onClick={handleNavClick}>
											<MdOutlineFavoriteBorder className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
											<span>Favorites</span>
										</NavLink>
										<NavLink to={'/clientdash/settings'} className={'flex items-center gap-2'} onClick={handleNavClick}>
											<RiSettings3Line className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
											<span>Settings</span>
										</NavLink>

										<SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'left' }} />
										
										<div className='flex items-center gap-2'>
											<TbLogout2 
												onClick={() => enqueueSnackbar('Logged out successfully', { variant: 'success' })} 
												className='transition-all duration-400 cursor-pointer hover:text-green-500' 
												size={30} 
											/>
											<span>Logout</span>
										</div>
									</div>
								</div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}