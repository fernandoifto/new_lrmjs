import axios from "axios";

function getBaseUrl(): string {
    if (typeof window !== "undefined") {
        return "/api/backend";
    }
    return process.env.API_INTERNAL_URL?.replace(/\/$/, "") || "http://127.0.0.1:3333";
}

export const api = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true,
});
