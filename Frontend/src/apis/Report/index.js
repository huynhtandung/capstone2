import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';

const url = 'report';

export const getReport = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
}