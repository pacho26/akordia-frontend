import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Profile from '../pages/Profile.vue';
import NewChords from '../pages/NewChords.vue';
import SongOverview from '@/pages/SongOverview.vue';

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
    {
      path: '/song/:id',
      name: 'song',
      component: SongOverview,
    },
  ],
});

export default router;
