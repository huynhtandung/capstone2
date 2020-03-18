import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';

const url1 = 'pdt-all-course';

export const pdtAllCourse = () => {
    return axiosService.get(`${API_ENDPOINT}/${url1}`);
};

const url2 = 'pdt-all-department';

export const pdtAllDepartment = () => {
    return axiosService.get(`${API_ENDPOINT}/${url2}`);
};

const url3 = 'pdt-all-class-department';

export const pdtClassDepartment = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url3}`, params);
};

const url4 = 'pdt-all-student-class';

export const pdtStudentClass = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url4}`, params);
};



