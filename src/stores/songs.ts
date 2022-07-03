import { defineStore } from 'pinia';
import type { Song } from '@/models/song.model';

interface State {
  songs: Song[];
}

export const useSongsStore = defineStore({
  id: 'songs',
  state: (): State => ({
    songs: [],
  }),
  getters: {},
  actions: {
    async setSongs(songs: Song[]) {
      this.songs = songs;
    },
  },
});
