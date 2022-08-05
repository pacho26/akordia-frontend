import type {
  Request,
  RequestCreate,
  RequestDTO,
  Vote,
} from '@/models/request.model';
import { http } from '../http';

export const getRandomRequest = (payload: any): Promise<RequestDTO> =>
  http.post('/requests/unvoted', payload);

export const createRequest = (request: RequestCreate): Promise<Request> =>
  http.post('/requests', request);

export const deleteRequest = (id: string): Promise<void> =>
  http.delete(`/requests/${id}`);

export const voteRequest = (voteData: Vote): Promise<Request> =>
  http.post('/requests/vote', voteData);
