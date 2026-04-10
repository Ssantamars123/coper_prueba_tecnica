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
  access_token: string;
  user: {
    name: string;
    email: string;
  };
}

export const login = async (data: LoginDto) => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterDto) => {
  const response = await apiClient.post<any>('/auth/register', data);
  return response.data;
};
