import axios from "axios";
import Cookies from "js-cookie";
import { refreshTokenApi, urlApi } from "./API";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./token";
const axiosInstance = axios.create({
    baseURL: urlApi,
    headers: {
        'Authorization': `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.data.statusCode === 401 && originalRequest.url === '/v1/authentication/refresh-token') {
            window.location.href = '/login';
            return Promise.reject(error);
        }

        if (error.response.data.statusCode === 401 &&
            error.response.data.message === 'Unauthorized') {
            const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)
            if (refreshToken) {
                return axiosInstance
                    .post('/v1/authentication/refresh-token', { refresh_token: refreshToken })
                    .then((response) => {
                        const {access_token, refresh_token} = response.data.data.newTokens
                        Cookies.set(ACCESS_TOKEN_KEY, access_token, {expires : 1/24})
                        Cookies.set(REFRESH_TOKEN_KEY, refresh_token)
                        error.config.headers['Authorization'] = 'Bearer ' + response.data.access;
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        console.log(err)
                        Cookies.remove()
                        window.location.href = '/login'
                    });
            } else {
                console.log("Refresh token not available.")
                // logout
                window.location.href = '/login'
            }
        }


        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);
export default axiosInstance;