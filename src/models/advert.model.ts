export interface Advert {
  _id?: string;
  title: string;
  content: string;
  authorId: string;
  authorUsername: string;
  data?: string;
}

export default Advert;
