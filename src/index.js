import React from 'react';
import ReactDOM from 'react-dom';

import Pace from 'pace-progress';
import 'pace-progress/themes/blue/pace-theme-minimal.css'

import App from './App';

Pace.start();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
