import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; 2024 FisherFarm. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-gray-400 mx-2">Privacy Policy</a>
          <a href="#" className="text-gray-400 mx-2">Terms of Service</a>
          <a href="#" className="text-gray-400 mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;