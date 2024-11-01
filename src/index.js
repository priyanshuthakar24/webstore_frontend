import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Authprovider } from './context/Authcontext';
import { ContextProvider } from './context/ContextProvider';
import { registerLicense } from '@syncfusion/ej2-base';
import { CartcontextProvider } from './context/Cartcontext';
const root = ReactDOM.createRoot(document.getElementById('root'));
registerLicense(process.env.REACT_APP_SYNC_LINCE)

root.render(
  <Authprovider>
    <ContextProvider>
      <CartcontextProvider>
        < App />
      </CartcontextProvider>
    </ContextProvider>
  </Authprovider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
