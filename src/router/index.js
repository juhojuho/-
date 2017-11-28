import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Cat from '@/pages/Cat';
import Spot from '@/pages/Spot';
import Cleaning from '@/pages/Cleaning';
import Feeding from '@/pages/Feeding';
import Login from '@/pages/Login';
import Loading from '@/pages/Loading';
import Add from '@/pages/Add';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/cat/:cid',
      name: 'Cat',
      component: Cat,
    },
    {
      path: '/spot',
      name: 'Spot',
      component: Spot,
    },
    {
      path: '/cleaning',
      name: 'Cleaning',
      component: Cleaning,
    },
    {
      path: '/feeding',
      name: 'Feeding',
      component: Feeding,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading,
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
    },
  ],
});
