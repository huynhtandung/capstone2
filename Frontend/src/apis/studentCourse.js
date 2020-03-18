import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'student-course';

export const studentCourse = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
