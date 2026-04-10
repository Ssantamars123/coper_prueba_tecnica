import apiClient from './client';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const login = async (data: LoginDto) => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterDto) => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
};
