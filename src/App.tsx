import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './router/index';
import './App.css';

function App() {
  return (
    <div className="app">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
