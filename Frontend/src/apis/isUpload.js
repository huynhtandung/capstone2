import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'is-upload';

export const isUpload = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
