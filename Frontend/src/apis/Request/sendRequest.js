import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';


const url1 = 'send-request';

export const sendRequest = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url1}`, params);
};
