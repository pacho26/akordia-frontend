import type { Song, SongCreate, SongDTO } from '../../models/song.model';
import { http } from '../http';

export const getSongs = (): Promise<Song[]> => http.get('/songs');

export const getSongById = (id: string): Promise<SongDTO> =>
  http.get(`/songs/${id}`);

export const createSong = (song: SongCreate): Promise<Song> =>
  http.post('/songs', song);

// export const updateSong = (id: string, song: SongEdit): Promise<Song> =>
//   http.patch(`/songs/${id}`, song);

export const deleteSong = (id: string): Promise<Song> =>
  http.delete(`/songs/${id}`);
