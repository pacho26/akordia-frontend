import type { Song, SongCreate, SongEdit } from '@/models/song.model';
import { http } from '../http';

export const getSong = async (id: string): Promise<Song> => {
  const { data } = await http.get(`/songs/${id}`);
  return data;
};

export const createSong = async (song: SongCreate): Promise<Song> => {
  const { data } = await http.post('/songs', song);
  return data;
};

export const updateSong = async (id: string, song: SongEdit): Promise<Song> => {
  const { data } = await http.patch(`/songs/${id}`, song);
  return data;
};

export const deleteSong = async (id: string): Promise<Song> => {
  const { data } = await http.delete(`/songs/${id}`);
  return data;
};

export const getSongsByUserId = async (userId: string): Promise<Song[]> => {
  const { data } = await http.post(`/songs/user/${userId}`);
  return data;
};

export const getSongsByArtist = async (payload: {
  artist: string;
}): Promise<Song[]> => {
  const { data } = await http.post('/songs/artist', payload);
  return data;
};

export const getSongsBySearchTerm = async (payload: {
  searchTerm: string;
}): Promise<Song[]> => {
  const { data } = await http.post('/songs/search', payload);
  return data;
};

export const getArtistsBySearchTerm = async (payload: {
  searchTerm: string;
}): Promise<string[]> => {
  const { data } = await http.post('/songs/search/artists', payload);
  return data;
};

export const getLastSongs = async (limit: number): Promise<Song[]> => {
  const { data } = await http.get(`/songs/last/${limit}`);
  return data;
};
