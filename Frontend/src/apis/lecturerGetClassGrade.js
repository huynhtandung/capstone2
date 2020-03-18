import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'grade-class';

export const lecturerGetClassGrade = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
