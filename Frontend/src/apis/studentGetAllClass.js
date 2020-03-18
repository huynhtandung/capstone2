import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'student-all-course';

export const studentGetAllClass = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
