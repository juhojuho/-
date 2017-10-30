import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Cat from '@/pages/Cat';
import Spot from '@/pages/Spot';
import Cleaning from '@/pages/Cleaning';
import Feeding from '@/pages/Feeding';

Vue.use(Router);

export default new Router({
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
      path: '/spot/:sid',
      name: 'Spot',
      component: Spot,
    },
    {
      path: '/spot/:sid/cleaning',
      name: 'Cleaning',
      component: Cleaning,
    },
    {
      path: '/spot/:sid/feeding',
      name: 'Feeding',
      component: Feeding,
    },
  ],
});
