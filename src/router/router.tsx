import { createBrowserRouter } from 'react-router';

import HomePage from '../Pages/Home';
import GeneralLayout from '../components/GeneralLayout';

export const router = createBrowserRouter([
  {
    element: <GeneralLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);
