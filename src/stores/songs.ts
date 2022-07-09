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
    // TODO: Is async necessary?
    async setSongs(songs: Song[]) {
      this.songs = songs;
    },
    addSong(song: Song) {
      this.songs.push(song);
    },
    updateSong(song: Song) {
      const index = this.songs.findIndex(({ _id }) => _id === song._id);
      this.songs[index] = song;
    },
  },
});
