import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './router/index';
import history from './router/history';
import './App.css';
import RoomModal from './view/layout/content/menu/room/roomModal';

function App() {
  return (
    <div className="app">
      <RouterProvider router={routes} history={history} />
      <RoomModal />
    </div>
  );
}

export default App;
