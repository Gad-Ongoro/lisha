import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Disclosure, DisclosureButton, DisclosurePanel, } from '@headlessui/react';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import { TbLogout2 } from "react-icons/tb";
import { AppContext } from '../../App';
import api from '../../api';
import { FaRegUser } from "react-icons/fa";
import { ChartPieIcon, CursorArrowRaysIcon, } from '@heroicons/react/24/outline';

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function HomeDrawer( {mobileMenuOpen, setMobileMenuOpen} ) {
  const { auth, setAuth, setSnackBarOpen } = useContext(AppContext);
  const [snackBarMsg, setSnackBarMsg] = useState('');
  const [ snackBarSeverity, setSnackBarSeverity ] = useState('');
  const refreshToken = localStorage.getItem('refresh');
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!refreshToken) {
      setSnackBarOpen(true);
      setSnackBarMsg('No refresh token found!');
      setSnackBarSeverity('error');
      return;
    }
  
    try {
      const res = await api.post('logout/', { 'refresh_token': refreshToken });
      if (res.status === 204) {
        setAuth(false);
        setSnackBarOpen(true);
        setSnackBarMsg('Successfully Logged Out!');
        setSnackBarSeverity('success');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/account/signin');
      }
    } catch (error) {
      setSnackBarOpen(true);
      setSnackBarMsg('Failed to log out!');
      setSnackBarSeverity('error');
      console.error('Logout Error:', error);
    }
  };
  return (
    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-50">
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
                    onClick={() => setMobileMenuOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                {/* <div className="px-4 sm:px-6">
                  <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Panel title</DialogTitle>
                </div> */}

                {/* content start */}
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm ">
                    <div className="flex items-center justify-between">
                      <NavLink to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">GOFoods</span>
                        <p className='text-xl font-bold'>GOFoods</p>
                      </NavLink>
                    </div>
                    <div className="mt-6 flow-root">
                      <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                          <Disclosure as="div" className="-mx-3">
                            <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                              Product
                              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                            </DisclosureButton>
                            <DisclosurePanel className="mt-2 space-y-2">
                              {[...products, ...callsToAction].map((item) => (
                                <DisclosureButton
                                  key={item.name}
                                  as="a"
                                  href={item.href}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                  {item.name}
                                </DisclosureButton>
                              ))}
                            </DisclosurePanel>
                          </Disclosure>
                          <a
                            href="#"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Features
                          </a>
                          <a
                            href="#"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Marketplace
                          </a>
                          <a
                            href="#"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Company
                          </a>
                        </div>
                        {
                          !auth && (
                            <div className="py-6">
                              <NavLink
                                to="/account/signin"
                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Login
                              </NavLink>
                            </div>
                          )
                        }

                        {
                          auth && (
                            <div className='flex gap-x-1 items-center transition-all duration-300 hover:font-bold hover:text-emerald-600 hover:text-xl'>
                              <NavLink to="/clientdash/dashview">
                                <FaRegUser />
                              </NavLink>
                              <NavLink to="/clientdash/dashview" className="text-sm font-semibold text-gray-900">
                                Account
                              </NavLink>
                            </div>
                          )
                        }

                        {
                          auth && (
                            <div 
                              onClick={handleLogout}
                              className='flex gap-x-1 mt-3 items-center transition-all duration-300 hover:font-bold hover:text-emerald-600 hover:text-xl'
                            >
                              <TbLogout2 
                                className='transition-all duration-400 cursor-pointer hover:text-green-500' 
                                size={20}
                              />
                              <Button type='button' className="text-sm font-semibold text-gray-900">
                                Logout
                              </Button>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </DialogPanel>
                  
                </div>
                {/* content end */}

              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
};