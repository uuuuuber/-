import React, { ReactNode } from 'react';
import Main from '../view/layout/content/menu/main';

const User = React.lazy(() => import('../view/layout/content/menu/user'));
const Room = React.lazy(() => import('../view/layout/content/menu/room'));
const Gift = React.lazy(() => import('../view/layout/content/menu/gift'));
const Order = React.lazy(() => import('../view/layout/content/menu/order'));
const Admin = React.lazy(() => import('../view/layout/content/menu/admin'));

interface IRoute {
  path: string;
  name: string;
  element: ReactNode;
}

export const routes: IRoute[] = [
  {
    path: '/',
    name: 'main',
    element: <Main />,
  },
  {
    path: '/main',
    name: 'main',
    element: <Main />,
  },
];
