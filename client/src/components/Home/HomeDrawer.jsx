import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { IoSearch } from "react-icons/io5";
import { Button, Disclosure, DisclosureButton, DisclosurePanel, } from '@headlessui/react';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import { TbLogout2 } from "react-icons/tb";
import { AppContext } from '../../App';
import { useAppContext } from '../../services/utilities';
import api from '../../api';
import { FaRegUser } from "react-icons/fa";
import { enqueueSnackbar } from 'notistack';

import { IoIosListBox } from "react-icons/io";
import { LuVegan } from "react-icons/lu";
import { GiFruitBowl } from "react-icons/gi";
import { TbEggs } from "react-icons/tb";
import { GiDoubleFish } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";
import { GiGrainBundle } from "react-icons/gi";
import { GiHoneyJar } from "react-icons/gi";
import { LuMilk } from "react-icons/lu";
import { FcShop } from "react-icons/fc";

const products = [
  { name: 'all', description: 'All products.', href: '/products', icon: IoIosListBox },
  { name: 'Vegetables', description: 'Fresh, nutritious vegetables for healthy meals.', href: '/products/vegetables', icon: LuVegan },
  { name: 'Fruits', description: 'Juicy, ripe fruits picked fresh for and tasty treats.', href: '/products/fruits', icon: GiFruitBowl },
  { name: 'Eggs & Dairy Products', description: 'Rich in flavor and essential nutrients.', href: '/products/eggs', icon: TbEggs },
  { name: 'Fish & Seafood', description: 'Sustainably sourced for delicious, healthy meals.', href: '/products/fish&seafood', icon: GiDoubleFish },
  { name: 'Meat & Poultry', description: 'Farm-raised for flavor and quality.', href: '/products/meat&poultry', icon: TbMeat },
  { name: 'Grains & Cereals', description: 'Nutritious grains and cereals for meals', href: '/products/grains&cereals', icon: GiGrainBundle },
  { name: 'Bee Products', description: 'Natural bee products, pure and beneficial for wellness.', href: '/products/beeproducts', icon: GiHoneyJar },
  { name: 'Yoghurts', description: 'Rich in protein and essential nutrients.', href: '/products/yoghurts', icon: LuMilk },
]

const callsToAction = [
  { name: 'Marketplace', href: '/marketplace', icon: FcShop },
  { name: 'Contact us', href: '/contact', icon: PhoneIcon },
]

const currencies = [
  { name: 'Kenyan Shilling', code: 'KES' },
  { name: 'United States Dollar', code: 'USD' },
]

export default function HomeDrawer() {
  const { getScrapedData, auth, setAuth, user_id } = useAppContext();
  const { setSnackBarOpen, mobileMenuOpen, setMobileMenuOpen, currency, setCurrency, setSearchModalOpen } = useContext(AppContext);
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
                        <p className='pacifico-regular text-green-700 text-3xl md:text-3xl font-bold'><i>GOFoods</i></p>
                      </NavLink>
                    </div>
                    <div className="mt-6 flow-root">
                      <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                          <Disclosure as="div" className="-mx-3">
                            <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                              Products
                              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                            </DisclosureButton>
                            <DisclosurePanel className="mt-2 space-y-2">
                              {[...products].map((item) => (
                                <NavLink
                                  key={item.name}
                                  to={`/products/${item.name}`}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    getScrapedData(item.name);
                                  }}
                                  className="group relative flex items-center gap-x-4 rounded-lg p-1 text-sm hover:bg-gray-50"
                                >
                                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-green-600" />
                                  </div>
                                  <div className="flex-auto">
                                    <a href={item.href} className="block font-semibold text-gray-900">
                                      {item.name}
                                      <span className="absolute inset-0" />
                                    </a>
                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                  </div>
                                </NavLink>
                              ))}
                            </DisclosurePanel>
                          </Disclosure>

                          <div onClick={() => {setSearchModalOpen(true); setMobileMenuOpen(false);}} className='flex items-center gap-x-1 py-2 rounded-full'>
                            <strong>Search Products</strong>
                            <div>
                              <IoSearch size={25} className='text-gray-500' />
                            </div>
                          </div>

                          <Popover className="relative">
                            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none">
                              <span className='font-bold'><strong>Currency</strong></span> <span className='text-green-700'>{currency}</span>
                              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                            </PopoverButton>

                            <PopoverPanel
                              transition
                              className="absolute -left-4 top-full z-10 mt-3 w-64 max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-green-50">
                                {currencies.map((item) => (
                                  <p
                                    key={item.code}
                                    href={item.href}
                                    onClick={() => {
                                      setCurrency(item.code);
                                      enqueueSnackbar(`Currency set to ${item.code}`, { variant: 'success' });
                                      localStorage.setItem('currency', item.code);
                                      }
                                    }
                                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 cursor-pointer"
                                  >
                                    {item.code}
                                  </p>
                                ))}
                              </div>
                            </PopoverPanel>
                          </Popover>

                          <NavLink
                            to="/marketplace"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Marketplace
                          </NavLink>
                          <NavLink
                            to="/contact"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Contact
                          </NavLink>
                        </div>
                        {
                          !auth && (
                            <div className="py-6">
                              <NavLink
                                to="/account/signin"
                                onClick={() => setMobileMenuOpen(false)}
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
                              <NavLink to={`/account/${user_id}/dashview/`} className="text-sm font-semibold text-gray-900">
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