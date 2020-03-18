import * as numberRequest from '../../constants/GetRequest/numberRequest';


export const  actionNumberRequest = (data) => {
    return{
        type : numberRequest.NUMBER_REQUEST,
        payload : {
            data
        }
    };
};

export const  actionUpdateNumberRequest = (data) => {
    return{
        type : numberRequest.UPDATE_NUMBER_REQUEST,
        payload : {
            data
        }
    };
};
