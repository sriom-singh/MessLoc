import axiosInstance from "@/lib/axios";
import {
    setAccessToken,
    clearAccessToken,
} from "@/lib/token";

export const AuthService = {
    login: async (credentials: {
        email: string;
        password: string;
    }) => {
        const { data } = await axiosInstance.post(
            "/auth/login",
            credentials
        );

        setAccessToken(data.accessToken);

        return data;
    },

    logout: async () => {
        const { data } = await axiosInstance.post("/auth/logout");

        clearAccessToken();

        return data;
    },

    refresh: async () => {
        const { data } = await axiosInstance.post("/auth/refresh");

        setAccessToken(data.accessToken);

        return data;
    },

    me: async () => {
        const { data } = await axiosInstance.get("/auth/me");

        return data;
    },
};