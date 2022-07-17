import { createRouter, createWebHistory } from 'vue-router';

//Pages
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import Profile from '@/pages/Profile.vue';
import SongAdd from '@/pages/song/SongAdd.vue';
import MySongbook from '@/pages/MySongbook.vue';
import SongOverview from '@/pages/song/SongOverview.vue';
import SongEdit from '@/pages/song/SongEdit.vue';

// Composables
import { useNotification } from '@/composables/useNotification';

// Services
import { getSongsByUserId } from '@/services/api/songs';

// Stores
import { useUserStore } from '@/stores/user';
import { useSongsStore } from '@/stores/songs';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/my-songbook',
      name: 'my-songbook',
      component: MySongbook,
      props: true,
      beforeEnter: async (to, from, next) => {
        const { user } = useUserStore();
        if (user) {
          const songs = await getSongsByUserId(user._id);
          const { setCurrentUserSongs } = useSongsStore();
          setCurrentUserSongs(songs.data);
          next();
        } else {
          const { showNotLoggedInNotication } = useNotification();
          showNotLoggedInNotication();
          next('/login');
        }
      },
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
          path: 'new',
          name: 'new',
          component: SongAdd,
          beforeEnter(to, from, next) {
            const { user } = useUserStore();
            if (user) {
              next();
            } else {
              const { showNotLoggedInNotication } = useNotification();
              showNotLoggedInNotication();
              next('/login');
            }
          },
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

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('User');
  if (user) {
    const userStore = useUserStore();
    userStore.setUser(JSON.parse(user));
  }
  next();
});

export default router;
