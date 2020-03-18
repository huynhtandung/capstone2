import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'get-is-upload';

export const getIsUpload = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
