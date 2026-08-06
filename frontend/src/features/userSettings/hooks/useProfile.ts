import { useQuery } from "@tanstack/react-query";
import { authService } from "../../auth/services/authService";

export const useProfile = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: authService.me,
    });
};
