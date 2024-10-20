import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GOFoodsAppContext from './services/utilities';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackbarProvider, useSnackbar, closeSnackbar } from 'notistack';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GOFoodsAppContext>
        <SnackbarProvider 
          maxSnack={4}
          className='z-50'
          // ref={myRef}
          action={(snackbarId) => (
            <button onClick={() => closeSnackbar(snackbarId)}>
              Dismiss
            </button>
          )}
        >
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </SnackbarProvider>
      </GOFoodsAppContext>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
