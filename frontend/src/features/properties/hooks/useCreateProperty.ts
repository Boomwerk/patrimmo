import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "../services/propertyService";

export const useCreateProperty = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: propertyService.createProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
    });
};