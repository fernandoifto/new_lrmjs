import axios from "axios";
import { resolveApiInternalUrl } from "@/lib/apiInternalUrl";

/** URL da API no SSR — lê env a cada chamada (Coolify injeta em runtime). */
export function getApiBaseUrl(): string {
    if (typeof window !== "undefined") {
        return "/api/backend";
    }

    if (process.env.API_INTERNAL_URL?.trim()) {
        return resolveApiInternalUrl();
    }

    const port = process.env.PORT || "3000";
    return `http://127.0.0.1:${port}/api/backend`;
}

export const api = axios.create({
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    config.baseURL = getApiBaseUrl();
    return config;
});
