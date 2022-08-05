export interface Request {
  _id: string;
  title: string;
  alternativeTitle?: string;
  artist: string;
  youtubeId?: string;
  content: string;
  author: string;
  rating: number;
  voters: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface RequestCreate {
  title: string;
  alternativeTitle?: string;
  artist: string;
  youtubeId?: string;
  content: string;
}

export interface RequestDTO {
  data: {
    request: Request;
    numberOfAvailable: number;
  };
}

export interface Vote {
  requestId: string;
  voterId: string;
  vote: number;
}

export default Request;
