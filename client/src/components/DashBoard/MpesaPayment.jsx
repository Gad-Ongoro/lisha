import React, { useState } from 'react';
import NavBar from '../Header/NavBar';
import AnimatedXPage from '../AnimatedXPage';
import api from '../../api';

const MpesaPaymentPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setPhoneNumber(input);
      if ((input.startsWith('7') || input.startsWith('1')) && input.length <= 9) {
        setFormattedPhoneNumber(`254${input}`);
      } else {
        setFormattedPhoneNumber('');
      }
    }
  };

  const handleAmountChange = (e) => {
    const input = e.target.value;
    if (/^\d*\.?\d*$/.test(input)) {
      setAmount(input);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formattedPhoneNumber.length === 12 && amount) {
      try {
        setLoading(true);
        const response = await api.post('mpesa/lipa-na-mpesa/', { phonenumber: formattedPhoneNumber, amount });
        console.log('Response:', response.data);
        alert('Payment initiated successfully');
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to initiate payment. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter a valid phone number and amount');
    }
  };

  return (
		<>
		<NavBar />
		<AnimatedXPage>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">M-Pesa Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone-number">
              Phone Number
            </label>
            <div className="flex items-center border rounded-md shadow-sm focus-within:ring focus-within:ring-indigo-100">
              <span className="px-3 py-2 bg-gray-200 border-r border-gray-300">+254</span>
              <input
                type="text"
                id="phone-number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full px-3 py-2 focus:outline-none"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
              placeholder="Enter the amount"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-indigo-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay with M-Pesa'}
          </button>
        </form>
      </div>
    </div>
		</AnimatedXPage>
		</>
  );
};

export default MpesaPaymentPage;