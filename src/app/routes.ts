import { Home } from './home/home.component';
import { About } from './about/about.component';
import { Example } from './example/example.component';

export const routes = [
  {
    path: '/',
    name: 'Get Weather',
    component: Home,
    useAsDefault: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/examples',
    name: 'Examples',
    component: Example
  }
];
