type SongModel = {
  id: string;
  title: string;
  alternativeTitle?: string;
  artist: string;
  youtubeId?: string; // For example: "dQw4w9WgXcQ" in "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
};

export default SongModel;
