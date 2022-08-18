import type { UserRole } from './user.model';

export interface UserLogin {
  email: string;
  password: string;
}

export type UserRegister = {
  username: string;
  email: string;
  password: string;
  role: UserRole.User;
};
