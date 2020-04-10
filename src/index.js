import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WeatherModel from './Models/WeatherModel';
import ThemeModel from './Models/ThemeModel';

const weatherStore = new WeatherModel();
const themeStore = new ThemeModel();

const stores = {
  weatherStore,
  themeStore
}

ReactDOM.render(
  <Provider {...stores} >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
