import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'student-school-year';

export const studentSchoolYear = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
