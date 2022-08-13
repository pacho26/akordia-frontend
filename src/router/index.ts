import { createRouter, createWebHistory } from 'vue-router';

//Pages
import Advert from '@/pages/Advert/Advert.vue';
import AdvertCreate from '@/pages/Advert/AdvertCreate.vue';
import Artist from '@/pages/Artist/Artist.vue';
import ArtistByLetter from '@/pages/Artist/ArtistByLetter.vue';
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import MySongbook from '@/pages/MySongbook.vue';
import Profile from '@/pages/Profile/Profile.vue';
import ProfileEdit from '@/pages/Profile/ProfileEdit.vue';
import Register from '@/pages/Register.vue';
import Request from '@/pages/Request.vue';
import SearchResults from '@/pages/SearchResults.vue';
import SongAdd from '@/pages/Song/SongAdd.vue';
import SongEdit from '@/pages/Song/SongEdit.vue';
import SongOverview from '@/pages/Song/SongOverview.vue';

// Composables
import { useNotification } from '@/composables/useNotification';

// Services
import { getAdverts } from '@/services/api/adverts';
import { getSongsByUserId } from '@/services/api/songs';

// Stores
import { useAdvertsStore } from '@/stores/adverts';
import { useSongsStore } from '@/stores/songs';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: async (to, from, next) => {
        const adverts = await getAdverts();
        const { setAdverts } = useAdvertsStore();
        setAdverts(adverts);
        next();
      },
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
      component: {
        template: '<router-view />',
      },
      children: [
        {
          path: ':id',
          name: 'profile-overview',
          component: Profile,
        },
        {
          path: ':id/edit',
          name: 'profile-edit',
          component: ProfileEdit,
        },
      ],
      beforeEnter: async (to, from, next) => {
        const { user } = useUserStore();
        if (user) {
          const songs = await getSongsByUserId(user._id);
          const { setCurrentUserSongs } = useSongsStore();
          setCurrentUserSongs(songs);
          next();
        } else {
          const { showNotLoggedInNotication } = useNotification();
          showNotLoggedInNotication();
          next('/login');
        }
      },
    },
    {
      path: '/requests',
      name: 'requests',
      component: Request,
      beforeEnter: async (to, from, next) => {
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
      path: '/my-songbook',
      name: 'my-songbook',
      component: MySongbook,
      beforeEnter: async (to, from, next) => {
        const { user } = useUserStore();
        if (user) {
          const songs = await getSongsByUserId(user._id);
          const { setCurrentUserSongs } = useSongsStore();
          setCurrentUserSongs(songs);
          next();
        } else {
          const { showNotLoggedInNotication } = useNotification();
          showNotLoggedInNotication();
          next('/login');
        }
      },
    },
    {
      path: '/search/:query',
      name: 'search',
      component: SearchResults,
      props: true,
    },
    {
      path: '/artist',
      name: 'artist',
      component: {
        template: '<router-view />',
      },
      children: [
        {
          path: ':artist',
          name: 'artist-overview',
          component: Artist,
          props: true,
        },
        {
          path: 'letter/:letter',
          name: 'artist-by-letter-overview',
          component: ArtistByLetter,
          props: true,
        },
      ],
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
    {
      path: '/advert',
      name: 'advert',
      component: {
        template: '<router-view />',
      },
      children: [
        {
          path: ':id',
          name: 'advert-overview',
          component: Advert,
        },
        {
          path: 'create',
          name: 'advert-create',
          component: AdvertCreate,
          beforeEnter(to, from, next) {
            const { user } = useUserStore();
            if (!user) {
              const { showNotLoggedInNotication } = useNotification();
              showNotLoggedInNotication();
              next('/login');
              return;
            }
            next();
          },
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
