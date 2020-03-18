import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'lecturer-student-class';

export const lecturerStudentClass = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
