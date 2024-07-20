import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import api from '../../api';

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input box if a digit is entered
      if (value !== '' && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join('');
    console.log('Entered OTP:', otpValue);
    // You can also handle further submission logic here
    try {
      api.post('user-verification-otp/', { email: localStorage.getItem('email'), otp: otpValue }).then((res) => {
        if (res.status === 200) {
          localStorage.removeItem('email');
          navigate('/account/signin');
          enqueueSnackbar(`Your account has been verified successfully!`, { variant: 'success' });
        }
      })
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${error.response.data.detail}`, { variant: 'error' });
    }
  };

  const handleRemindMeLater = () => {
    navigate('/account/signin');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-emerald-100 h-screen bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Enter your OTP</h1>
      <div className="flex space-x-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            className="w-10 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
						autoComplete="off"
          />
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white bg-emerald-500 rounded hover:bg-emerald-600"
        >
          Submit
        </button>
        <button
          onClick={handleRemindMeLater}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Remind Me Later
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;