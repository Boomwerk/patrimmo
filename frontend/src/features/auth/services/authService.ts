import apiClient from '../../../lib/axios';
import type { loginFormData } from '../schemas/loginSchema';
import type { RegisterFormData } from '../schemas/registerSchema';

interface RegisterResponse {
    message: string;
    user: {
        id: string;
        email:string;
        firstName: string;
        lastName: string;
    };
}

interface LoginResponse {
    token: string;
    refresh_token: string;
}



export const authService = {
    register : async (data: RegisterFormData): Promise<RegisterResponse> => {

        const response = await apiClient.post<RegisterResponse>('/api/register', data);
        return response.data;
    },

    login: async (data: loginFormData): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/api/login', data);
        return response.data
    }
}