export interface Advert {
  _id?: string;
  title: string;
  content: string;
  authorId: string;
  authorUsername: string;
}

export interface AdvertCreate {
  title: string;
  content: string;
}

export default Advert;
