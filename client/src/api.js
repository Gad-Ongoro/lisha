import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = process.env.REACT_APP_API_URL;

let accessToken = localStorage.getItem('access') || '';
let refreshToken = localStorage.getItem('refresh') || '';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
});

api.interceptors.request.use(
    async (req) => {
        if (!accessToken) {
            accessToken = localStorage.getItem('access') || '';
            refreshToken = localStorage.getItem('refresh') || '';
        }

        if (accessToken) {
            const user = jwtDecode(accessToken);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

            if (!isExpired) {
                req.headers.Authorization = `Bearer ${accessToken}`;
                return req;
            }

            try {
                const response = await axios.post(`${baseURL}token/refresh/`, {
                    refresh: refreshToken,
                });

                accessToken = response.data.access;
                localStorage.setItem('access', accessToken);
                req.headers.Authorization = `Bearer ${accessToken}`;
            } catch (error) {
                console.error('Token refresh failed:', error);
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                localStorage.clear();
                window.location.href = '/account/signin';
                return Promise.reject(error);
            }
        }

        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;