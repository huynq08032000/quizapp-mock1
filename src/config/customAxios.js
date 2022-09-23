import Axios from "axios";
import { urlApi } from "./API";

const axios = Axios.create({
    baseURL: `${urlApi}`,
    headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
    (config) => {
        return Promise.resolve(config);
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;