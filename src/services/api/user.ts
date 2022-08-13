import type { User, UserUpdate } from '@/models/user.model';
import { http } from '@/services/http';

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await http.get('/users/me');
  return data;
};

export const updateCurrentUser = async (
  userData: UserUpdate
): Promise<User> => {
  const { data } = await http.put('/users/me', userData);
  return data;
};

export const deleteCurrentUser = async (): Promise<User> => {
  const { data } = await http.delete('/users/me');
  return data;
};

export const getUser = async (id: string): Promise<User> => {
  const { data } = await http.get(`/users/${id}`);
  return data;
};

export const getUsers = async (): Promise<User[]> => {
  const { data } = await http.get('/users');
  return data;
};

export const createUser = async (userData: User): Promise<User> => {
  const { data } = await http.post('/users', userData);
  return data;
};

export const updateUser = async (
  id: string,
  userData: UserUpdate
): Promise<User> => {
  const { data } = await http.patch(`/users/${id}`, userData);
  return data;
};

export const deleteUser = async (id: string): Promise<User> => {
  const { data } = await http.delete(`/users/${id}`);
  return data;
};

export const getTopVoters = async (): Promise<User[]> => {
  const { data } = await http.get('/users/top/voters');
  return data;
};

export const getTopAuthors = async (): Promise<User[]> => {
  const { data } = await http.get('/users/top/authors');
  return data;
};
