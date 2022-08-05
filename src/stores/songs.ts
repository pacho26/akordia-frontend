import { defineStore } from 'pinia';
import type { Song } from '@/models/song.model';
import LocalStorageService from '@/services/local_storage';
import _ from 'lodash';

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
    addSong(song: Song) {
      this.songs.push(song);
    },
    updateSong(song: Song) {
      const index = this.songs.findIndex(({ _id }) => _id === song._id);
      this.songs[index] = song;
    },
    setCurrentUserSongs(songs: Song[]) {
      this.userSongs = _.sortBy(songs, [(song) => song.title.toLowerCase()]);
    },
    setLastViewedArtist(artist: string) {
      this.lastViewedArtist = artist;
    },
    setFoundSongs(songs: Song[]) {
      this.foundSongs = _.sortBy(songs, [(song) => song.title.toLowerCase()]);
    },
    setFoundArtists(artists: string[]) {
      this.foundArtists = artists.sort(Intl.Collator().compare);
    },
    setFoundArtistsByLetter(artists: string[]) {
      this.foundArtistsByLetter = artists.sort(Intl.Collator().compare);
    },
    setRecentSong(song: Song) {
      this.recentSongs = this.recentSongs.filter(({ _id }) => _id !== song._id);
      this.recentSongs.unshift(song);

      if (this.recentSongs.length > 6) {
        this.recentSongs.pop();
      }
    },
    clearSongsData() {
      this.$reset();
      LocalStorageService.instance.remove('songs');
    },
  },
});
