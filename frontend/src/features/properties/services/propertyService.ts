import apiClient from "../../../lib/axios";
import type { CreatePropertyData } from "../schemas/propertySchema";
import type { Property } from "../types/property";

interface CreatePropertyApiResponse {
    message: string;
    property: Property;
}

interface ListPropertiesApiResponse {
    properties: Property[];
}

export const propertyService = {
    createProperty: async (data: CreatePropertyData): Promise<CreatePropertyApiResponse> => {
        const response = await apiClient.post<CreatePropertyApiResponse>("/api/properties", {
            ...data,
            rentAmout: data.rentAmout.toString(),
            chargesAmount: data.chargesAmount.toString(),
        });
        return response.data;
    },

    getProperties: async (): Promise<Property[]> => {
        const response = await apiClient.get<ListPropertiesApiResponse>("/api/properties");
        return response.data.properties;
    },
};