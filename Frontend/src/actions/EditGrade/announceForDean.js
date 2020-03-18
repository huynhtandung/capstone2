import * as announce from '../../constants/EditGrade/announce';

export const  actionGetAnnounceForDean = (params = {}) => {
    return{
        type : announce.GET_ANNOUNCE_FOR_DEAN,
        payload : {
            params
        }
    };
};
export const  actionGetAnnounceForDeanSuccess = (data) => {
    return{
        type : announce.GET_ANNOUNCE_FOR_DEAN_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetAnnounceForDeanFail = (error) => {
    return{
        type : announce.GET_ANNOUNCE_FOR_DEAN_FAIL,
        payload : {
            error
        }
    };
}


