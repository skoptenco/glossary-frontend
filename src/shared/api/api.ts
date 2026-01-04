import axios from 'axios';
import type { Term } from "@/shared/model/term";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    },
    adapter: "fetch"
})

export const getApi = {
    getTerms: async () => axiosInstance.get<Term[]>('/terms'),
}