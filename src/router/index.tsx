import React, { ReactNode } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
// import Main from '../view/layout/content/menu/main';
import Login from '../view/home/login';
import Registration from '../view/home/registration';
import NotFound from '../view/notFound';
import Layout from '../view/layout/layout';

const User = React.lazy(() => import('../view/layout/content/menu/user'));
const Room = React.lazy(() => import('../view/layout/content/menu/room'));
const Gift = React.lazy(() => import('../view/layout/content/menu/gift'));
const Order = React.lazy(() => import('../view/layout/content/menu/order'));
const Admin = React.lazy(() => import('../view/layout/content/menu/admin'));
const GoodOrder = React.lazy(
  () => import('../view/layout/content/menu/goodorder')
);
const UserGood = React.lazy(
  () => import('../view/layout/content/menu/usergood')
);
const Apply = React.lazy(
  () => import('../view/layout/content/menu/apply/index')
);

interface IProtectedRouteProps {
  children: ReactNode;
}
function ProtectedRoute({ children }: IProtectedRouteProps) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <User />,
      },
      // {
      //   path: '/main',
      //   element: <Main />,
      // },
      {
        path: '/user',
        element: <User />,
      },
      {
        path: '/room',
        element: <Room />,
      },
      {
        path: '/gift',
        element: <Gift />,
      },
      {
        path: '/order',
        element: <Order />,
      },
      {
        path: '/goodorder',
        element: <GoodOrder />,
      },
      {
        path: '/apply',
        element: <Apply />,
      },
      {
        path: '/usergood',
        element: <UserGood />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
