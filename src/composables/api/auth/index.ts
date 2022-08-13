import type { UserLogin, UserRegister } from '@/models/auth.model';
import * as auth from '@/services/api/auth';
import LocalStorageService from '@/services/local_storage';
import { useRequestsStore } from '@/stores/requests';
import { useSongsStore } from '@/stores/songs';
import { useUserStore } from '@/stores/user';
import { get, set } from '@vueuse/core';
import { storeToRefs } from 'pinia';

export const useStoredLogin = () => {
  const userStore = useUserStore();

  const checkSavedLogin = async () => {
    const token = LocalStorageService.instance.getAccessToken();
    if (token) {
      const success = await userStore.getCurrentUser();
      if (success) {
        userStore.setToken(token);
        return;
      }
    }
    userStore.clearUserData();
  };

  return {
    checkSavedLogin,
  };
};

export const useAuth = () => {
  const router = useRouter();
  const userStore = useUserStore();
  const { clearSongsData } = useSongsStore();
  const { clearRequestsData } = useRequestsStore();
  const { user, token } = storeToRefs(userStore);

  const error = ref<string | null>(null);
  const isError = computed(() => get(error) !== null);
  const isSuccess = computed(() => get(error) === null);

  const register = async (userData: UserRegister) => {
    set(error, null);

    try {
      const userWithToken = await auth.register(userData);
      userStore.setUserData(userWithToken);
      return userWithToken;
    } catch (err) {
      console.error(err);
      set(error, err);
      return false;
    }
  };

  const login = async (credentials: UserLogin) => {
    set(error, null);

    try {
      const userWithToken = await auth.login(credentials);
      userStore.setUserData(userWithToken);
      return userWithToken;
    } catch (err) {
      console.error(err);
      set(error, err);
      return false;
    }
  };

  const logout = async () => {
    set(error, null);

    try {
      userStore.clearUserData();
      clearSongsData();
      clearRequestsData();
      router.replace('/login');
    } catch (err) {
      set(error, err);
    }
  };

  return {
    user: readonly(user),
    token: readonly(token),
    register,
    login,
    logout,
    error,
    isError,
    isSuccess,
  };
};
