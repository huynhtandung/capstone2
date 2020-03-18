import * as pdtTranscriptConst from '../../constants/PDTTranscript/pdtTranscript';


export const  actionGetPDTAllStudentClass = (params) => {
    return{
        type : pdtTranscriptConst.PDT_ALL_STUDENT_CLASS,
        payload : {
            params
        }
    };
};

