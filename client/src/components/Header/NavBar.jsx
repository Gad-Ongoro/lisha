import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUserAdd } from "react-icons/hi";
import { AppContext } from '../../App';
import api from '../../api';
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { auth, setAuth } = useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const  handleLogout = () => {
    setAuth(false);
    localStorage.clear();
  }

  return (
    <header className={`sticky top-0 z-40 ${isScrolled ? 'bg-emerald-100' : 'bg-white'} transition-all duration-300`}>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
            <span className="sr-only">Your Company</span>
            <NavLink to={'/'} className='text-2xl font-bold text-emerald-600'>GOFoods</NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none">
              Products
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <div>
            <div className='flex items-center bg-gray-300 gap-x-1 px-2 rounded-full'>
              <IoSearch className='text-gray-500' />
              <input type="search" placeholder='Search here' className='rounded-full p-1 bg-gray-300 outline-none'></input>
            </div>
          </div>

					<div className='transition-all duration-300 hover:text-emerald-600 cursor-pointer'>
						<select className='rounded-lg' name="" id="" onChange={(e) => localStorage.setItem('currency', e.target.value)}>
							<option disabled selected value={localStorage.getItem('currency')}>{localStorage.getItem('currency') ? localStorage.getItem('currency') : 'Ksh'}</option>
							<option value="Ksh">Ksh</option>
							<option value="USD">USD</option>
						</select>
					</div>

        </PopoverGroup>
        <div className="hidden lg:flex items-center lg:gap-x-4 lg:flex-1 lg:justify-end">
          {
            !auth &&
            (
              <div className='flex gap-x-1 items-center transition-all duration-300 hover:font-bold hover:text-emerald-600 hover:text-xl'>
                <NavLink to={'/account/usertype'}>
                  <HiOutlineUserAdd />
                </NavLink>
                <NavLink to="/account/usertype" className="text-sm font-semibold text-gray-900">
                  Sign up
                </NavLink>
              </div>
            )
          }


          {
            !auth &&
            (
              <div className='flex gap-x-1 items-center transition-all duration-300 hover:font-bold hover:text-emerald-600 hover:text-xl'>
                <NavLink to="/account/signin" className="text-sm font-semibold text-gray-900">
                  Login
                </NavLink>
                <NavLink to={'/account/signin'}>
                  <IoIosLogIn className='font-bold text-xl' />
                </NavLink>
              </div>
            )
          }

          {
            auth &&
            (
              <div 
                onClick={handleLogout}
                className='flex gap-x-1 items-center transition-all duration-300 hover:font-bold hover:text-emerald-600 hover:text-xl'
              >
                <NavLink to="/account/signin" className="text-sm font-semibold text-gray-900">
                  Logout
                </NavLink>
                <NavLink to={'/account/signin'}>
                  <IoLogOutOutline className='font-bold text-xl' />
                </NavLink>
              </div>
            )
          }
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">GOFoods</span>
              <p>GOFoods</p>
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
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
              <div className="py-6">
                <NavLink
                  to="/signin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}