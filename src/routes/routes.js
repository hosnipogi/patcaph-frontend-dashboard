import { lazy } from 'react';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const Safety = lazy(() => import('../pages/Safety'));
const Contact = lazy(() => import('../pages/Contact'));
const Users = lazy(() => import('../pages/Users'));
const User = lazy(() => import('../pages/User'));
const Contributions = lazy(() => import('../pages/Contributions'));
const FBA = lazy(() => import('../pages/FBA'));

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    showOnSidebar: true,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    showOnSidebar: false,
    protectedRoute: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    showOnSidebar: false,
  },
  {
    path: '/contributions',
    name: 'Contributions',
    component: Contributions,
    showOnSidebar: true,
  },
  {
    path: '/fba',
    name: 'FBA/DRF Request',
    component: FBA,
    showOnSidebar: true,
  },
  {
    path: '/safety',
    name: 'Voluntary Safety Reporting',
    component: Safety,
    showOnSidebar: true,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    showOnSidebar: true,
  },
  {
    protectedRoutes: [
      {
        path: '/users',
        name: 'Users',
        component: Users,
        showOnSidebar: true,
      },
    ],
  },
];

export default routes;
