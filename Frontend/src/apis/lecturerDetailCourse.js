import axiosService from '../commons/axiosService';
import {API_ENDPOINT} from '../constants';

const url = 'lecturer-detail-course';

export const lecturerDetailCourse = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, params);
};
