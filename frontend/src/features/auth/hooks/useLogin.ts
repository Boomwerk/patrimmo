import { useMutation } from "@tanstack/react-query"
import type { loginFormData } from "../schemas/loginSchema"
import { authService } from "../services/authService"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../../stores/authStore"


export const useLogin = () => {

    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth)

    return useMutation({
        mutationFn: (data: loginFormData) => authService.login(data),
        onSuccess: (data) => {
            setAuth(data.token, data.refresh_token);
            navigate('/tableau-de-bord');
        }
    });
}