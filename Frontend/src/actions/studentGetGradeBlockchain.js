import * as studentGetGradeBlockchain from '../constants/studentGetGradeBlockchain.js';

/*export const  actionStudentGetGradeBlockchain = (params = {}) => {
    return{
        type : studentGetGradeBlockchain.STUDENT_GET_GRADE_BLOCKCHAIN,
        payload : {
            params
        }
    };
};*/
export const  actionStudentGetGradeBlockchainSuccess = (data) => {
    return{
        type : studentGetGradeBlockchain.STUDENT_GET_GRADE_BLOCKCHAIN_SUCCESS,
        payload : {
            data
        }
    };
};
export const  actionStudentGetGradeBlockchainFail = (error) => {
    return{
        type : studentGetGradeBlockchain.STUDENT_GET_GRADE_BLOCKCHAIN_FAIL,
        payload : {
            error
        }
    };
}


