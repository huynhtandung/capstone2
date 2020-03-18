import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';

const url1 = 'pdt-school-year';

export const pdtSchoolYear = () => {
    return axiosService.get(`${API_ENDPOINT}/${url1}`);
};

const url2 = 'pdt-department';

export const pdtDepartment = () => {
    return axiosService.get(`${API_ENDPOINT}/${url2}`);
};

const url3 = 'pdt-student-class';

export const pdtStudentClass = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url3}`, params);
};

const url4 = 'pdt-outline';

export const pdtOutline = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url4}`, params);
};

const url5 = 'pdt-course';

export const pdtCourse = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url5}`, params);
};

