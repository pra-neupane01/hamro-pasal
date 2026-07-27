import { api } from './client';

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    fullName: string;
    email: string;
    contactNumber: string;
    role: 'ADMIN' | 'CASHIER';
    token: string;
  };
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  contactNumber: string;
  role?: 'ADMIN' | 'CASHIER';
}

export const authApi = {
  login: (email: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { email, password }),

  register: (payload: RegisterPayload) =>
    api.post<LoginResponse>('/auth/register', payload),
};
