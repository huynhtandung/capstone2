import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'all-grade-student';

export const studentGetAllGrade = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
