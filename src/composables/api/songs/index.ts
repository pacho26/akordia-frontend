import type { Song, SongCreate, SongEdit } from '@/models/song.model';
import * as api from '@/services/api/songs';
import { useSongsStore } from '@/stores/songs';
import { set } from '@vueuse/core';
import { useResultState } from '../index';

const loading = ref(false);

export const useSong = () => {
  const song = ref<Song>();
  const { error, isError, isSuccess } = useResultState();
  const { setLastViewedArtist } = useSongsStore();

  const fetchSong = async (id: string) => {
    try {
      set(loading, true);

      const fetchedSong = await api.getSong(id);
      if (fetchedSong) {
        set(song, fetchedSong);
        setLastViewedArtist(fetchedSong.artist);
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

export const useSongCreate = () => {
  const store = useSongsStore();
  const song = ref<Song>();
  const { error, isError, isSuccess } = useResultState();

  const createSong = async (songData: SongCreate) => {
    try {
      const newSong = await api.createSong(songData);
      if (newSong) {
        set(song, newSong);
        store.addSong(newSong);
        return newSong;
      }
    } catch (err) {
      set(error, err);
      return false;
    }
  };

  return {
    song,
    createSong,
    error,
    isError,
    isSuccess,
  };
};

export const useSongUpdate = () => {
  const store = useSongsStore();
  const song = ref<Song>();
  const { error, isError, isSuccess } = useResultState();

  const updateSong = async (id: string, songData: SongEdit) => {
    try {
      const updatedSong = await api.updateSong(id, songData);
      if (updatedSong) {
        set(song, updatedSong);
        store.updateSong(updatedSong);
        return updatedSong;
      }
    } catch (err) {
      set(error, err);
      return false;
    }
  };

  return {
    song: readonly(song),
    updateSong,
    error,
    isError,
    isSuccess,
  };
};
