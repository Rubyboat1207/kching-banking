import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Account from './pages/Account';
import Services from './pages/Services';

const router = createBrowserRouter([
  {
    path: "/kching-bank",
    element: <Home />,
  },
  {
    path: "/kching-bank/account",
    element: <Account />,
  },
  {
    path: '/kching-bank/services',
    element: <Services />
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
