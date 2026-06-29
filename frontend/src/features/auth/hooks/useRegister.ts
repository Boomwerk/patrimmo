import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import type { RegisterFormData } from "../schemas/registerSchema";


export const useRegister = () => {

    return useMutation({
        mutationFn: (data: RegisterFormData) => authService.register(data)
    });
}