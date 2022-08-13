import type { Advert } from '@/models/advert.model';
import { http } from '../http';

export const getAdverts = async (): Promise<Advert[]> => {
  const { data } = await http.get('/adverts');
  return data;
};

export const getAdvertById = async (id: string): Promise<Advert> => {
  const { data } = await http.get(`/adverts/${id}`);
  return data;
};

export const createAdvert = async (advert: Advert): Promise<Advert> => {
  const { data } = await http.post('/adverts/create', advert);
  return data;
};

export const deleteAdvertById = async (id: string): Promise<Advert> => {
  const { data } = await http.delete(`/adverts/${id}`);
  return data;
};
