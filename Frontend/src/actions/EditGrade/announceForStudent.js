import * as announce from '../../constants/EditGrade/announce';

export const  actionGetAnnounceForStudent = (params = {}) => {
    return{
        type : announce.GET_ANNOUNCE_FOR_STUDENT,
        payload : {
            params
        }
    };
};
export const  actionGetAnnounceForStudentSuccess = (data) => {
    return{
        type : announce.GET_ANNOUNCE_FOR_STUDENT_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionGetAnnounceForStudentFail = (error) => {
    return{
        type : announce.GET_ANNOUNCE_FOR_STUDENT_FAIL,
        payload : {
            error
        }
    };
}


