import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'student-get-grade-one-class';

export const studentGradeBlockchain = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
