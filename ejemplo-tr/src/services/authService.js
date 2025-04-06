import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:6500/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const LoginService = async (pin) => {
    try {
        const response = await axiosInstance.post('/login', { "pin":pin });
        return response.data;
    } catch (error) {
        console.error("Error during deposit:", error);
        throw error.response?.data || error.message;
    }
};
