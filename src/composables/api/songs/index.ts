import { set } from '@vueuse/core';
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

export const useSong = () => {
  const song = ref<Song>();
  const { error, isError, isSuccess } = useResultState();

  const fetchSong = async (id: string) => {
    try {
      set(loading, true);

      const fetchedSong = await api.getSongById(id);
      if (fetchedSong) {
        set(song, fetchedSong.data);
        return song;
      }
    } catch (err) {
      set(error, err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    song,
    fetchSong,
    error,
    isError,
    isSuccess,
    loading,
  };
};
