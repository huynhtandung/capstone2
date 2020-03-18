import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'lecturer-course';

export const lecturerCourse = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
