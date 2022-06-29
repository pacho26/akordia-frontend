import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Profile from '@/pages/Profile.vue';
import NewChords from '@/pages/NewChords.vue';
import MySongbook from '@/pages/MySongbook.vue';
import SongOverview from '@/pages/song/SongOverview.vue';
import SongEdit from '@/pages/song/SongEdit.vue';

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
      path: '/my-songbook',
      name: 'my-songbook',
      component: MySongbook,
    },
    {
      path: '/song',
      component: {
        template: '<router-view />',
      },
      children: [
        {
          path: ':id',
          name: 'song',
          component: SongOverview,
        },
        {
          path: ':id/edit',
          name: 'song-edit',
          component: SongEdit,
        },
      ],
    },
  ],
});

export default router;
