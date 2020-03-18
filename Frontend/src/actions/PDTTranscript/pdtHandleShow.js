import * as pdtTranscriptConst from '../../constants/PDTTranscript/pdtTranscript';


export const  actionPDTHandleShow = (data) => {
    return{
        type : pdtTranscriptConst.PDT_TRANSCRIPT_HANDLE_SHOW,
        payload : {
            data
        }
    };
};



