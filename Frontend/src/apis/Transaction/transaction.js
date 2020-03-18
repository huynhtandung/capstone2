import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';

const url = 'get-transaction-hash';

export const getTransactionHash = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};

const url1 = 'get-transaction-data';

export const getTransactionData = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url1}`, params);
};

