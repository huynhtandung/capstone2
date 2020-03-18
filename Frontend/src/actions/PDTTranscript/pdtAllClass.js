import * as pdtTranscriptConst from '../../constants/PDTTranscript/pdtTranscript';


export const  actionGetPDTAllClass = (params) => {
    return{
        type : pdtTranscriptConst.PDT_ALL_CLASS,
        payload : {
            params
        }
    };
};

