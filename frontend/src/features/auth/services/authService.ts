import apiClient from '../../../lib/axios';
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



export const authService = {
    register : async (data: RegisterFormData): Promise<RegisterResponse> => {

        const response = await apiClient.post<RegisterResponse>('/api/register', data);
        return response.data;
    }
}