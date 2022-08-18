import { lazy } from 'solid-js';
import type { RouteDefinition } from "@solidjs/router";
 
//import AboutData from './pages/about.data';
const Home = lazy(() => import('./pages/home'));
const About  = lazy(() => import('./pages/about'));
const Error = lazy(() => import('./errors/404'));

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home, 
  },
  {
    path: '/about',
    component: About,
    //data: AboutData,
  },
  {
    path: '**',
    component: Error,
    
  },
];
