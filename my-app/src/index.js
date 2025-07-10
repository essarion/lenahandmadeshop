import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { ModalProvider } from './assets/components/Modal/ModalProvider';
import { Provider } from 'react-redux';
import { storeCart } from './assets/store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={storeCart}>
      <ModalProvider>

        <App />


      </ModalProvider>
    </Provider>
  </BrowserRouter>
);

