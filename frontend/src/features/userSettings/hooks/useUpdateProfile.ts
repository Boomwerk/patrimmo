import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settingService } from "../services/settingService";
import { useAuthStore } from "../../../stores/authStore";

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: settingService.setUser,
        onSuccess: (data) => {
            if (data.token) {
                const refreshToken = useAuthStore.getState().refreshToken;
                useAuthStore.getState().setAuth(data.token, refreshToken ?? "");
            }
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};
