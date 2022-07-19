import { defineStore } from 'pinia';
import type { Song } from '@/models/song.model';
import LocalStorageService from '@/services/local_storage';

interface State {
  songs: Song[];
  userSongs: Song[];
  foundSongs: Song[];
  foundArtists: string[];
  foundArtistsByLetter: string[];
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
    foundArtistsByLetter: [],
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
      this.lastViewedArtist = artist;
    },
    setFoundSongs(songs: Song[]) {
      this.foundSongs = songs;
    },
    setFoundArtists(artists: string[]) {
      this.foundArtists = artists;
    },
    setFoundArtistsByLetter(artists: string[]) {
      this.foundArtistsByLetter = artists;
    },
    setRecentSong(song: Song) {
      this.recentSongs = this.recentSongs.filter(({ _id }) => _id !== song._id);
      this.recentSongs.unshift(song);

      if (this.recentSongs.length > 5) {
        this.recentSongs.pop();
      }
    },
    clearSongsData() {
      this.$reset();
      LocalStorageService.instance.remove('songs');
    },
  },
});
