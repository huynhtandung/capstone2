import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';

const url = 'get-department-for-admin';

export const getDepartment = () => {
    return axiosService.get(`${API_ENDPOINT}/${url}`);
};

const url1 = 'get-wallet-address-by-department';

export const getWalletAddress = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url1}`, params);
};

const url2 = 'get-balance';

export const getBalance = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url2}`, params);
};

const url3 = 'send-eth';

export const sendEth = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url3}`, params);
};

