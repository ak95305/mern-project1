import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserPlaces from './scenes/UserPlaces/UserPlaces.jsx';
import UsersListing from './scenes/UserListing/UsersLIsting.jsx';
import CreatePlace from './scenes/Place/CreatePlace.jsx';
import EditPlace from './scenes/Place/EditPlace.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UsersListing />
  },
  {
    path: '/users',
    element: <UsersListing />
  },
  {
    path: '/user/:id',
    element: <UserPlaces />
  },
  {
    path: '/create-place',
    element: <CreatePlace />
  },
  {
    path: '/place/:id',
    element: <EditPlace />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
