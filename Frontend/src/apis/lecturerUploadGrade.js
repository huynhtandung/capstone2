import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'upload-grade';

export const lecturerUploadGrade = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
