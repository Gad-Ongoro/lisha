import React, { useEffect, useState, useContext } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NavLink, useNavigate } from 'react-router-dom';
import SnackBar from '../Notifications/SnackBar';
import CartIcon from '../Cart/CartIcon';
import { IoSearch } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { AppContext } from '../../App';
import api from '../../api';
import { Button, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react';
import { IoIosListBox } from "react-icons/io";
import { Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import { LuVegan } from "react-icons/lu";
import { GiFruitBowl } from "react-icons/gi";
import { TbEggs } from "react-icons/tb";
import { GiDoubleFish } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";
import { GiGrainBundle } from "react-icons/gi";
import { GiHoneyJar } from "react-icons/gi";
import { LuMilk } from "react-icons/lu";

const categoriesList = [
  { name: 'All', description: 'All products.', href: '/products', icon: IoIosListBox },
  { name: 'Vegetables', description: 'Fresh, nutritious vegetables for healthy meals.', href: '/products/vegetables', icon: LuVegan },
  { name: 'Fruits', description: 'Juicy, ripe fruits picked fresh for and tasty treats.', href: '/products/fruits', icon: GiFruitBowl },
  { name: 'Eggs', description: 'Rich in flavor and essential nutrients.', href: '/products/eggs', icon: TbEggs },
  { name: 'Fish & Seafood', description: 'Sustainably sourced for delicious, healthy meals.', href: '/products/fish&seafood', icon: GiDoubleFish },
  { name: 'Meat & Poultry', description: 'Farm-raised for flavor and quality.', href: '/products/meat&poultry', icon: TbMeat },
  { name: 'Grains & Cereals', description: 'Nutritious grains and cereals for meals', href: '/products/grains&cereals', icon: GiGrainBundle },
  { name: 'Bee Products', description: 'Natural bee products, pure and beneficial for wellness.', href: '/products/beeproducts', icon: GiHoneyJar },
  { name: 'Dairy Products', description: 'Rich in protein and essential nutrients.', href: '/products/dairyproducts', icon: LuMilk },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const currency = [
  { name: 'Kenyan Shilling', code: 'KES' },
  { name: 'United States Dollar', code: 'USD' },
]

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { auth, setAuth, user_id, user, setSnackBarOpen, setCartOpen, mobileMenuOpen, setMobileMenuOpen, products, setProducts } = useContext(AppContext);
  const [snackBarMsg, setSnackBarMsg] = useState('');
  const [ snackBarSeverity, setSnackBarSeverity ] = React.useState('');
  const refreshToken = localStorage.getItem('refresh');
  const navigate = useNavigate();

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

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 1) {
      try {
        const response = await api.get(`products/?search=${term}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Search Error:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

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
    <>
      <SnackBar message={snackBarMsg} severity={snackBarSeverity} />
      <header className={`sticky top-0 z-40 ${isScrolled ? 'bg-emerald-100' : 'bg-white'} transition-all duration-300`}>
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <span className="sr-only">GOFoods</span>
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
                <div className="p-1">
                  {categoriesList.map((item) => (
                    <NavLink
                      key={item.name}
                      to={`/products/${item.name}`}
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
                <input type="search" placeholder='Search here' onChange={handleSearchChange} className='rounded-full p-1 bg-gray-300 outline-none'></input>
                {searchResults.length > 0 && (
                  <ul className="absolute left-0 mt-12 w-full bg-white shadow-lg rounded-lg">
                    {searchResults.map((product) => (
                      <li
                        key={product.id}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setSearchTerm('');
                          setSearchResults([]);
                          navigate(`/products/${product.category}/${product.id}`);
                        }}
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none">
                Currency
                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute -left-20 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-green-50">
                  {currency.map((item) => (
                    <p
                      key={item.code}
                      href={item.href}
                      onClick={() => {
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
                  <NavLink to={`/account/signin`}>
                    <IoIosLogIn className='font-bold text-xl' />
                  </NavLink>
                </div>
              )
            }


            {
              (auth && user.role === 'buyer') && (
                <CartIcon></CartIcon>
              )
            }

            {
              auth && (
                <div className='flex gap-x-1 items-center transition-all duration-300 hover:font-bold hover:text-emerald-600 hover:text-xl'>
                  <NavLink to={`/account/${user_id}/dashview`}>
                    <FaRegUser />
                  </NavLink>
                  <NavLink to={`/account/${user_id}/dashview`} className="text-sm font-semibold text-gray-900">
                    Account
                  </NavLink>
                </div>
              )
            }

            {
              auth && (
                <div 
                  onClick={handleLogout}
                  className='flex gap-x-1 items-center transition-all duration-300 hover:font-bold hover:text-emerald-600 hover:text-xl'
                >
                  <Button type='button' className="text-sm font-semibold text-gray-900">
                    Logout
                  </Button>
                  <span>
                    <IoLogOutOutline className='font-bold text-xl' />
                  </span>
                </div>
              )
            }
          </div>
        </nav>

      </header>
    </>
  )
}