export interface Song {
  _id: string;
  title: string;
  alternativeTitle?: string;
  artist: string;
  youtubeId?: string; // For example: "dQw4w9WgXcQ" in "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  content: string;
  __v?: number;
}

export default Song;
