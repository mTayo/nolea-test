import React, { lazy } from 'react';
import DashboardLayout from 'Layouts/DashboardLayout';
import Loadable from 'components/common/Loadable';
import { Navigate } from 'react-router-dom';
import HomePageLayout from 'Layouts/HomePageLayout';


// ===========================|| DASHBOARD ROUTING ||=========================== //

const HomePage = Loadable(lazy(() => import("pages/HomePage")));
const UserList = Loadable(lazy(() => import("pages/Users/Listing")));



export const DashboardRoutes = {
    path: '/admin',
    element: (
        <DashboardLayout />
  
    ),
    children: [
        {
            path: '/admin',
            element: <Navigate to="/admin/user-management" replace />
        },
        {
            path: '/admin/user-management',
            element: <UserList />
        }
    ]
};

export const HomeRoutes = {
  path: "/",
  element: <HomePageLayout />,
  children: [
    {
        path: '/',
        element: <Navigate to="/home" replace />
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    
  ],
};
