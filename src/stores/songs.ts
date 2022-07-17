import { defineStore } from 'pinia';
import type { Song } from '@/models/song.model';

interface State {
  songs: Song[];
  userSongs: Song[];
  foundSongs: Song[];
  lastViewedArtist: string;
}

export const useSongsStore = defineStore({
  id: 'songs',
  state: (): State => ({
    songs: [],
    userSongs: [],
    foundSongs: [],
    lastViewedArtist: '',
  }),
  persist: true,
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
    setCurrentUserSongs(songs: Song[]) {
      this.userSongs = songs;
    },
    setLastViewedArtist(artist: string) {
      localStorage.setItem('LastViewedArtist', artist);
      this.lastViewedArtist = artist;
    },
    setSearchResuls(songs: Song[]) {
      this.foundSongs = songs;
    },
  },
});
