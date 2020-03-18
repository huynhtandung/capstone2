import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';

const url1 = 'check-private-key';

export const getPrivateKey = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url1}`, params);
};

const url2 = 'check-phien-request';

export const checkPhienRequest = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url2}`, params);
};

