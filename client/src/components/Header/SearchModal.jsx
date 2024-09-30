'use client'

import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { IoSearch } from "react-icons/io5";
import { enqueueSnackbar } from 'notistack';
import { AppContext } from '../../App';
import api from '../../api';

export default function SearchModal() {
  const { searchModalOpen, setSearchModalOpen, user } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

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

  return (
    <Dialog open={searchModalOpen} onClose={() => {setSearchModalOpen(false); setSearchTerm('');}} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex h-4/5 overflow-hidden w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-12">
                  <div className='flex items-center bg-gray-300 gap-x-1 px-2 rounded-full'>
                    <IoSearch className='text-gray-500' />
                    <input 
                      type="search" 
                      placeholder='Search here' 
                      onChange={handleSearchChange} 
                      onClick={() => setSearchModalOpen(true)} 
                      className='w-full rounded-full p-2 bg-gray-300 outline-none' 
                    />
                  </div>
                </div>
                <div className="sm:col-span-12 overflow-y-auto max-h-96">
                  {searchResults.length > 0 && (
                    <div className="mt-4 w-full bg-white shadow-lg rounded-lg">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            setSearchTerm('');
                            setSearchResults([]);
                            setSearchModalOpen(false);
                            navigate(`/products/${product.category}/${product.id}`);
                          }}
                        >
                          <img 
                            src={product.image} alt={product.name} 
                            className='w-16 h-16 object-cover rounded-lg'
                          />
                          <p className='ml-4'>
                            <strong>{product.name}</strong>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
};