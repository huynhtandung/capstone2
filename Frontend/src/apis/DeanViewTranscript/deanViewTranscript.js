import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';

const url1 = 'dean-khoa';

export const deanKhoa = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url1}`, params);
};

const url2 = 'dean-class';

export const deanClass = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url2}`, params);
};

const url3 = 'dean-student-class';

export const deanStudentClass = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url3}`, params);
};

const url4 = 'dean-student-course';

export const deanStudentCourse = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url4}`, params);
};

