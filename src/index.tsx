import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'components/modal/Modal';
import App from './App';

import { store } from './redux/store';
import { Provider } from 'react-redux';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Modal />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
