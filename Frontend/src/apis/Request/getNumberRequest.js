import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';


const url1 = 'number-request-for-pdt';

export const numberRequestForPDT = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url1}`, params);
};

const url2 = 'number-request-for-dean';

export const numberRequestForDean = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url2}`, params);
};

const url3 = 'number-request-for-lecturer';

export const numberRequestForLecturer = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url3}`, params);
};

