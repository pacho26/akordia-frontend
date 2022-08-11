import type { Advert } from '@/models/advert.model';
import { http } from '../http';

export const getAdvertById = (id: string): Promise<Advert> =>
  http.get(`/adverts/${id}`);

export const createAdvert = (advert: Advert): Promise<Advert> =>
  http.post('/adverts/create', advert);

export const deleteAdvert = (id: string): Promise<Advert> =>
  http.delete(`/adverts/${id}`);
