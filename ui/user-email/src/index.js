import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

const { PUBLIC_URL } = process.env;

ReactDOM.render(
  <App baseName={PUBLIC_URL} />,
  document.getElementById('root')
);

