import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global-style.css';
import {Home} from './templates/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home/>
  </React.StrictMode>
);
 
// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<Home tab="home" />);