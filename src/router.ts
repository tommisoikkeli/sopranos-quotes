import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/people',
      name: 'people',
      component: () =>
        import('./views/People.vue'),
    },
    {
      path: '/people/:id',
      name: 'quotes',
      component: () =>
        import('./views/Quotes.vue'),
    },
    {
      path: '/best',
      name: 'best',
      component: () =>
        import('./views/BestQuotes.vue'),
    },
  ],
});
