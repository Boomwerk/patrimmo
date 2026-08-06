import { useMutation } from "@tanstack/react-query";
import { settingService } from "../services/settingService";

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: settingService.updatePassword,
    });
};
