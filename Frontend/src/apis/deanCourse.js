import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'dean-course';

export const deanCourse = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
