import type { Song } from '@/models/song.model';
import * as api from '@/services/api/songs';
import { useSongsStore } from '@/stores/songs';
import { useResultState } from '../index';

const loading = ref(false);

export const useSongs = () => {
  const { error, isError, isSuccess } = useResultState();
  const store = useSongsStore();

  const fetchSongs = async () => {
    loading.value = true;
    try {
      const songs = await api.getSongs();
      store.setSongs(songs);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchSongs,
    error,
    isError,
    isSuccess,
    loading,
  };
};
