import axios from "axios";

export const api = axios.create({
    baseURL: "https://rocketnotes-api-6u0q.onrender.com",
});
