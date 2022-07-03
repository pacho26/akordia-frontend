import type { Song } from '../../models/song.model';
import { http } from '../http';

export const getSongs = (): Promise<Song[]> => http.get('/songs');

export const getSongById = (id: string): Promise<Song> =>
  http.get(`/songs/${id}`);
