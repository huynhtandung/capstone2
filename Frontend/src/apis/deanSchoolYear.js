import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'dean-school-year';

export const deanSchoolYear = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
