import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown, fallback: string): string => {
    if (isAxiosError(error)) {
        const data = error.response?.data as { error?: string | Record<string, string> } | undefined;

        if (typeof data?.error === "string") {
            return data.error;
        }

        if (data?.error && typeof data.error === "object") {
            const messages = Object.values(data.error);
            if (messages.length > 0) {
                return messages.join(" ");
            }
        }
    }

    return fallback;
};