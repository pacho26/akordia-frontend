import type { UserLogin, UserRegister } from '@/models/auth.model';
import type { UserWithToken } from '@/models/user.model';
import { http } from '@/services/http';

export const login = async (credentials: UserLogin): Promise<UserWithToken> => {
  const { data } = await http.post('/login', credentials);
  return data;
};

export const register = async (
  userData: UserRegister
): Promise<UserWithToken> => {
  const { data } = await http.post('/register', userData);
  return data;
};
