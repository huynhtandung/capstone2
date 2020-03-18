import * as ct from '../../constants/Feedback/index';

export const  createFeedback = (params = {}) => {
    return{
        type : ct.CREATE_FEED_BACK,
        payload : {
            params
        }
    };
};
export const  createFeedbackSuccess = (data) => {
    return{
        type : ct.CREATE_FEED_BACK_SUCCESS,
        payload : {
            data
        }
    };
};
export const  createFeedbackFail = (error) => {
    return{
        type : ct.CREATE_FEED_BACK_FAIL,
        payload : {
            error
        }
    };
}


