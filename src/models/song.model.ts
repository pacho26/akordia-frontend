export interface Song {
  _id: string;
  title: string;
  alternativeTitle?: string;
  artist: string;
  youtubeId?: string;
  content: string;
  author: string;
  authorUsername?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export enum SongAction {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface SongCreate {
  title: string;
  alternativeTitle?: string;
  artist: string;
  youtubeId?: string;
  content: string;
}

export type SongEdit = Partial<SongCreate>;

export default Song;
