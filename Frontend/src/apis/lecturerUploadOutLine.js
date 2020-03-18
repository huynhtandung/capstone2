import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'upload-percent';

export const lecturerUploadOutLine = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
