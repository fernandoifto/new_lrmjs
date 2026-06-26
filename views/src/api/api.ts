import axios from "axios";

/** URL da API no SSR — lê env a cada chamada (Coolify injeta em runtime). */
export function getApiBaseUrl(): string {
    if (typeof window !== "undefined") {
        return "/api/backend";
    }

    const direct = process.env.API_INTERNAL_URL?.replace(/\/$/, "");
    if (direct) {
        return direct;
    }

    // Fallback: proxy interno do Next (route /api/backend lê API_INTERNAL_URL por request)
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
