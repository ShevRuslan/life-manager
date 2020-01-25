import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.jsx';
import {BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
  document.getElementById('root'));

