import { createBrowserRouter } from 'react-router';

import HomePage from '../Pages/Home';
import GeneralLayout from '../components/GeneralLayout';
import Register from '../Features/auth/Register';
import Login from '../Features/auth/Login';

export const router = createBrowserRouter([
  {
    element: <GeneralLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
