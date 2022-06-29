import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Profile from '../pages/Profile.vue';
import NewChords from '../pages/NewChords.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/new-chords',
      name: 'new-chords',
      component: NewChords,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
});

export default router;
