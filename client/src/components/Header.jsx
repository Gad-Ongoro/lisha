import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-700">
          FisherFarm
        </div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700">Home</a>
          <a href="#" className="text-gray-700">About</a>
          <a href="#" className="text-gray-700">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;