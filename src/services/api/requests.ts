import type { Request, RequestCreate, Vote } from '@/models/request.model';
import { http } from '../http';

export const getRandomRequest = async (payload: {
  userId: string;
}): Promise<{ request: Request; numberOfAvailable: number }> => {
  const { data } = await http.post('/requests/unvoted', payload);
  return data;
};

export const createRequest = async (
  request: RequestCreate
): Promise<Request> => {
  const { data } = await http.post('/requests', request);
  return data;
};

export const deleteRequest = async (id: string): Promise<void> => {
  const { data } = await http.delete(`/requests/${id}`);
  return data;
};

export const voteRequest = async (voteData: Vote): Promise<Request> => {
  const { data } = await http.post('/requests/vote', voteData);
  return data;
};
