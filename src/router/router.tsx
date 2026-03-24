import { createBrowserRouter } from 'react-router';

import HomePage from '../Pages/Home';
import GeneralLayout from '../components/GeneralLayout';
import Register from '../Features/auth/Register';
import Login from '../Features/auth/Login';
import ProtectedRoutes from '../Features/auth/ProtectedRoute';
import MyProfile from '../Features/profile/Profile';
import Settings from '../Features/Settings/Settings';
import ArticleEditor from '../Features/articles/ArticleEditor';
import Article from '../Features/articles/Article';

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
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: '/profile/:username',
            element: <MyProfile />,
          },
          {
            path: 'profile/:username/favorites',
          },
          {
            path: '/settings',
            element: <Settings />,
          },
          {
            path: '/editor',
            element: <ArticleEditor />,
          },
          {
            path: 'editor/:articleSlug',
            element: <ArticleEditor />,
          },
          {
            path: 'article/:articleSlug',
            element: <Article />,
          },
        ],
      },
    ],
  },
]);
