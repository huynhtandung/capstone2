import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'student-detail-grade';

export const studentDetailGrade = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
