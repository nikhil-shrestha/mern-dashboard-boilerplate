import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import validators from './common/validators';
import Routes from './routes/routes';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUserStart } from './store/auth/auth.action';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

if (localStorage.getItem('auth::token')) {
  setAuthToken(localStorage.getItem('auth::token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUserStart());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
