import axiosService from './../commons/axiosService';
import {API_ENDPOINT} from './../constants';

const url = 'login';

export const login = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
