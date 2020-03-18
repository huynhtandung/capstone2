import * as announce from '../../constants/EditGrade/announce'

export const  actionGetAnnounceForLecturer = (params = {}) => {
    return{
        type : announce.GET_ANNOUNCE_FOR_LECTURER,
        payload : {
            params
        }
    };
};
export const  actionGetAnnounceForLecturerSuccess = (data) => {
    return{
        type : announce.GET_ANNOUNCE_FOR_LECTURER_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetAnnounceForLecturerFail = (error) => {
    return{
        type : announce.GET_ANNOUNCE_FOR_LECTURER_FAIL,
        payload : {
            error
        }
    };
}


