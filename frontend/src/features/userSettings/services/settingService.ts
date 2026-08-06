import apiClient from "../../../lib/axios";
import type { SettingUserdata, UpdatePasswordData } from "../schemas/SettingUserSchemas";

interface SettingUserResponse {
    message:string;
    token?: string;
}

export const settingService = {
    setUser : async(data: SettingUserdata): Promise<SettingUserResponse> => {
        const response = await apiClient.patch<SettingUserResponse>('/api/me',data);
        return response.data;
    },

    updatePassword: async(data: UpdatePasswordData): Promise<SettingUserResponse> => {
        const response = await apiClient.patch<SettingUserResponse>('/api/me/password', data);
        return response.data;
    }
}