import type {
  Request,
  RequestCreate,
  RequestDTO,
  Vote,
} from '@/models/request.model';
import { http } from '../http';

export const getRandomRequest = (): Promise<RequestDTO> =>
  http.get('/requests');

export const createRequest = (request: RequestCreate): Promise<Request> =>
  http.post('/requests', request);

export const voteRequest = (voteData: Vote): Promise<Request> =>
  http.post('/requests/vote', voteData);
