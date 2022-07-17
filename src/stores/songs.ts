import { defineStore } from 'pinia';
import type { Song } from '@/models/song.model';
import _ from 'lodash';

interface State {
  songs: Song[];
  userSongs: Song[];
  foundSongs: Song[];
  foundArtists: string[];
  recentSongs: Song[];
  lastViewedArtist: string;
}

export const useSongsStore = defineStore({
  id: 'songs',
  state: (): State => ({
    songs: [],
    userSongs: [],
    foundSongs: [],
    foundArtists: [],
    recentSongs: [],
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
    setFoundSongs(songs: Song[]) {
      this.foundSongs = songs;
    },
    setFoundArtists(artists: string[]) {
      this.foundArtists = artists;
    },
    setRecentSong(song: Song) {
      const hasSong = this.recentSongs.find(({ _id }) => _id === song._id);
      if (!hasSong) {
        this.recentSongs.push(song);
        if (this.recentSongs.length > 5) {
          this.recentSongs.shift();
        }
      }
    },
  },
});
