import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './Components/App';
import Login from './Components/Login'
import Home from './Components/Home'

const router = createBrowserRouter([
  {
    path:"/", 
    element: <App />,
    children: [
      {
        path:"/",
        element: <Login />
      },
      {
        path:"/home",
        element: <Home />
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
