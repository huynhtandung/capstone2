import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';


const url1 = 'make-request';

export const makeRequest = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url1}`, params);
};
