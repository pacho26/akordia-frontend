import { defineStore } from 'pinia';
import type SongModel from '@/models/song';

export type RootState = {
  songs: SongModel[];
};

export const useSongs = defineStore({
  id: 'songs',
  state: () =>
    ({
      songs: [
        {
          id: 'zA16CZ',
          title: 'Devojka sa čardaš nogama',
          artist: 'Đorđe Balašević',
          youtubeId: 'kr9NGtWhEOo',
        },
        {
          id: 'aDPkf0',
          title: 'Dođi',
          artist: 'Parni Valjak',
          youtubeId: 'xLwwoPnjIys',
        },
        {
          id: 'fMa9SG',
          title: 'Bacila je sve niz rijeku',
          artist: 'Indexi',
          youtubeId: 'AiQkXmiA-Rs',
        },
      ],
    } as RootState),
  getters: {
    allSongs: (state) => state.songs,
  },
  actions: {
    // fetchSongById: async (state, payload) => {
    //   const songs = await fetch(`/api/songs/${payload.id}`).then((response) =>
    //     response.json()
    //   );
    //   state.songs = songs;
    // },
    getSongById(id: string) {
      return this.allSongs.find((song) => song.id === id);
    },
  },
});
