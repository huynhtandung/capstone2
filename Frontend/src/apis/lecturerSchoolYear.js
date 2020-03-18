import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'lecturer-school-year';

export const lecturerSchoolYear = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
