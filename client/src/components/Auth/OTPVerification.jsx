import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Header/NavBar';
import AnimatedXPage from '../Animations/AnimatedXPage';
import HelixUIBall from '../Loaders/HelixUIBall';
import { enqueueSnackbar } from 'notistack';
import { AppContext } from '../../App';
import api from '../../api';

const OTPVerification = () => {
  const { loading, setLoading } = useContext(AppContext);
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

  // Verify OTP
  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const response = await api.post('user-verification-otp/', { email: localStorage.getItem('email'), otp: otp.join('') });
      if (response.status === 200) {
        setLoading(false);
        localStorage.removeItem('email');
        navigate('/account/signin');
        enqueueSnackbar(`Your account has been verified successfully!`, { variant: 'success' });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      enqueueSnackbar(`${error.response.data.detail}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    try {
      setLoading(true);
      const response = await api.post('resend-verification-otp/', { email: localStorage.getItem('email') });
      if (response.status === 200) {
        setLoading(false);
        enqueueSnackbar(`OTP resent to ${localStorage.getItem('email')}`, { variant: 'success' });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      enqueueSnackbar(`${error.response.data.detail}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
    
  };

  const handleRemindMeLater = () => {
    navigate('/account/signin');
  };

  return (
    <>
      <NavBar />
      <AnimatedXPage>
        <div className="flex flex-col items-center justify-center bg-emerald-100 h-screen bg-gray-100">
          <h1 className="mb-4 text-2xl font-bold">Enter verification code</h1>
          <p className="mb-4">We've sent a verification code to {localStorage.getItem('email')}. Please enter it below.</p>
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
          { loading && <HelixUIBall /> }
          <div className='flex space-x-2 mb-2'>
            <p>Didn't receive the code?</p>
            <p className="text-blue-500 cursor-pointer" onClick={handleResendOTP}>Click to resend</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleRemindMeLater}
              className="px-4 py-2 text-white bg-orange-400 rounded hover:bg-orange-500"
            >
              Remind Me Later
            </button>
            <button
              // onClick={handleSubmit}
              onClick={handleVerifyOTP}
              className="px-4 py-2 text-white bg-emerald-500 rounded hover:bg-emerald-600"
            >
              Verify
            </button>
          </div>
        </div>
      </AnimatedXPage>
    </>
  );
};

export default OTPVerification;