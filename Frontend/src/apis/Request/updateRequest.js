import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';


const url1 = 'update-request-for-pdt';

export const updateRequestForPDT = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url1}`, params);
};

const url2 = 'update-request-for-dean';

export const updateRequestForDean = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url2}`, params);
};

const url3 = 'update-request-for-lecturer';

export const updateRequestForLecturer = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url3}`, params);
};


