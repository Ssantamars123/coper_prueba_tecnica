import { create } from 'zustand';
import { login, register } from '../api/auth';
import type { LoginDto, RegisterDto, AuthResponse } from '../api/auth';
import toast from 'react-hot-toast';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (data: LoginDto) => Promise<boolean>;
  register: (data: RegisterDto) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize from local storage, checking for invalid 'undefined' string that might have leaked
  let storedToken = localStorage.getItem('token');
  if (storedToken === 'undefined') storedToken = null;
  
  return {
    token: storedToken,
    isAuthenticated: !!storedToken,
    isLoading: false,

    login: async (data: LoginDto) => {
      set({ isLoading: true });
      try {
        const response: AuthResponse = await login(data);
        localStorage.setItem('token', response.access_token);
        set({ token: response.access_token, isAuthenticated: true, isLoading: false });
        toast.success('¡Sesión iniciada exitosamente!');
        return true;
      } catch (err: any) {
        const msg = err.response?.data?.message || 'Error al iniciar sesión';
        toast.error(Array.isArray(msg) ? msg[0] : msg);
        set({ isLoading: false });
        return false;
      }
    },

    register: async (data: RegisterDto) => {
      set({ isLoading: true });
      try {
        await register(data);
        // Backend doesn't return token on register, so we auto-login now
        const loginResponse: AuthResponse = await login({ email: data.email, password: data.password });
        localStorage.setItem('token', loginResponse.access_token);
        set({ token: loginResponse.access_token, isAuthenticated: true, isLoading: false });
        toast.success('¡Cuenta creada e iniciada exitosamente!');
        return true;
      } catch (err: any) {
        const msg = err.response?.data?.message || 'Error al registrarte';
        toast.error(Array.isArray(msg) ? msg[0] : msg);
        set({ isLoading: false });
        return false;
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      set({ token: null, isAuthenticated: false });
      toast.success('Sesión cerrada');
    }
  };
});
