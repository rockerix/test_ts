import axios from 'axios';
const API_URL = 'http://localhost:6500/api/accounts';

const getAuthToken = () => {
    return sessionStorage.getItem('t');
};

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const checkBalance = async (id) => {
    try {
        const response = await axiosInstance.post('/balance', { "idAccount":id });
        return response.data;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
    }
};


export const getBalanceDetail = async (id) => {
    try {
        const response = await axiosInstance.post('/balanceDetail', { "idAccount":id });
        return response.data;
    } catch (error) {
        console.error("Error fetching balance detail:", error);
        return null;
    }
};

export const depositMoney = async (id,amount) => {
    try {
        const response = await axiosInstance.post('/deposit', { "idAccount":id ,"amount":amount });
        return response.data; 
    } catch (error) {
        console.error("Error during deposit:", error);
        throw error.response?.data || error.message;
    }
};

export const withdrawMoney = async (id,amount) => {
    try {
        const response = await axiosInstance.post('/withdraw', { "idAccount":id ,"amount":amount });
        return response.data;
    } catch (error) {
        console.error("Error during withdrawal:", error);
        throw error.response?.data || error.message;
    }
};



export const changePin = async (id,newPin) => {
    try {
        const response = await axiosInstance.post('/change-pin', {  "idAccount":id ,"newPin":newPin  });
        return response.data;
    } catch (error) {
        console.error("Error changing PIN:", error);
        throw error.response?.data || error.message;
    }
};
