import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { refreshTokenApi, urlApi } from "./API";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./token";

const axiosInstance = axios.create({
    baseURL: urlApi,
    headers: {
        'Authorization': `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(async (req) => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
    const refresh_token = Cookies.get(REFRESH_TOKEN_KEY)
    if (accessToken) return req
    if (refresh_token) {
        try {
            const res = await axios.post(refreshTokenApi, {
                "refresh_token": refresh_token
            })
            Cookies.set(ACCESS_TOKEN_KEY, res.data.data.newTokens.access_token, { expires: 1 / 24 })
            Cookies.set(REFRESH_TOKEN_KEY, res.data.data.newTokens.refresh_token, { expires: 7 })
            req.headers.Authorization = `Bearer ${res.data.data.newTokens.access_token}`
            return req
        } catch (error) {
        }
    } else {
        console.log('K co refresh')
        useNavigate()('/login')
    }
    return Promise.reject(req);
}
)
axiosInstance.interceptors.response.use((res) => {
    console.log(res)
    return res
}
);
export default axiosInstance;