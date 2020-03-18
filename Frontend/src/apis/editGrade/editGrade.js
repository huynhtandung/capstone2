import axiosService from '../../commons/axiosService';
import {API_ENDPOINT} from '../../constants';


const url4 = 'get-status';

export const getStatus = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url4}`, params);
};

const url5 = 'accept-req';

export const acceptReq = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url5}`, params);
};

const url1 = 'make-announce';

export const makeAnnounce = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url1}`, params);
};

const url11 = 'make-announce-for-pdt';

export const makeAnnounceForPDT = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url11}`, params);
};

const url2 = 'get-announce';

export const getAnnounce = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url2}`, params);
};

const url3 = 'get-announce-for-dean';

export const getAnnounceForDean = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url3}`, params);
};

const url33 = 'get-announce-for-lecturer';

export const getAnnounceForLecturer = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url33}`, params);
};

const url8 = 'get-announce-for-pdt';

export const getAnnounceForPDT = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url8}`, params);
};

const url9 = 'create-feedback';

export const createFeedback = (params = {}) => {
    return axiosService.post(`${API_ENDPOINT}/${url9}`, params);
};




