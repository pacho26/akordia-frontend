import type {
  Request,
  RequestCreate,
  RequestDTO,
} from '@/models/request.model';
import { http } from '../http';

export const getRandomRequest = (): Promise<RequestDTO> =>
  http.get('/requests');

export const createRequest = (request: RequestCreate): Promise<Request> =>
  http.post('/requests', request);
