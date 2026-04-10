import axios from "axios";

export const axiosIns = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API, 
    headers: {
        "Content-Type": "application/json",
    },
});

axiosIns.interceptors.request.use((config) => {
    const token = localStorage.getItem("sh_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosIns.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("sh_token");
            localStorage.removeItem("sh_user");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);