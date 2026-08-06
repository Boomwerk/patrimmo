import { useQuery } from "@tanstack/react-query";
import { propertyService } from "../services/propertyService";

export const useProperties = () => {
    return useQuery({
        queryKey: ["properties"],
        queryFn: propertyService.getProperties,
    });
};