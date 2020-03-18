import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'upload-student-percent';

export const lecturerUploadStudent = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
