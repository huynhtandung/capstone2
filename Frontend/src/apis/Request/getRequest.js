import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';


const url1 = 'get-request-for-pdt';

export const getRequestForPDT = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url1}`, params);
};

const url2 = 'get-request-for-dean';

export const getRequestForDean = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url2}`, params);
};

const url3 = 'get-request-for-lecturer';

export const getRequestForLecturer = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url3}`, params);
};

