import React, { lazy } from 'react';
import DashboardLayout from 'Layouts/DashboardLayout';
import Loadable from 'components/common/Loadable';
import { Navigate } from 'react-router-dom';
import HomePageLayout from 'Layouts/HomePageLayout';


// ===========================|| DASHBOARD ROUTING ||=========================== //

const HomePage = Loadable(lazy(() => import("pages/HomePage")));
const UserList = Loadable(lazy(() => import("pages/Users/Listing")));
const Dashboard = Loadable(lazy(() => import("pages/Dashboard")));



export const DashboardRoutes = {
    path: '/admin',
    element: (
        <DashboardLayout />
  
    ),
    children: [
        {
            path: '/admin',
            element: <Navigate to="/admin/dashboard" replace />
        },
        {
            path: '/admin/user-management',
            element: <UserList />
        },
        {
          path: '/admin/dashboard',
          element: <Dashboard />
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
