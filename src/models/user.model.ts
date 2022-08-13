export interface UserWithToken {
  user: User;
  token: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  band?: string;
  location?: string;
  contact?: string;
  instruments?: string[];
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  numberOfVotes?: number;
  __v?: number;
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export type UserUpdate = Partial<User> | { password?: string };
