import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './router/index';
import history from './router/history';
import './App.css';

function App() {
  return (
    <div className="app">
      <RouterProvider router={routes} history={history} />
    </div>
  );
}

export default App;
