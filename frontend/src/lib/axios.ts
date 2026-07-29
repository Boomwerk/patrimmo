import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": 'application/json'
    }
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;
       

        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry=true; 
            
            const refreshToken = useAuthStore.getState().refreshToken;

            if(!refreshToken){
                useAuthStore.getState().clearAuth();
                window.location.href="/connexion";
                return Promise.reject(error);
            }

            try{
                const response = await apiClient.post("/api/token/refresh", {
                    refresh_token: refreshToken,
                });

                const {token , refreshToken: newRefreshToken } = response.data;
                useAuthStore.getState().setAuth(token, newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${token}`;
                return apiClient(originalRequest); 


            }catch {
                useAuthStore.getState().clearAuth();
                window.location.href="/connexion";
                return Promise.reject(error);
            }
        }

    } 
)

export default apiClient;