import * as announce from '../../constants/EditGrade/announce';

export const  actionGetAnnounce = (params = {}) => {
    return{
        type : announce.GET_ANNOUNCE,
        payload : {
            params
        }
    };
};
export const  actionGetAnnounceSuccess = (data) => {
    return{
        type : announce.GET_ANNOUNCE_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetAnnounceFail = (error) => {
    return{
        type : announce.GET_ANNOUNCE_FAIL,
        payload : {
            error
        }
    };
}


