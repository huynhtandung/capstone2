import * as lecturerUploadOutLine from '../constants/lecturerUploadOutline';
import * as toastify from '../commons/toastify';


const initialState = "";

const reducer = (state = initialState, action) => {
    switch(action.type){
        case lecturerUploadOutLine.UPLOAD_OUTLINE:{   
            return state;
        }
        case lecturerUploadOutLine.UPLOAD_OUTLINE_SUCCESS:{
            const {data} = action.payload;
            state = data.transactionHash;
            //toastify.toastifySuceess("Loading 60%")
            return state;
        }
        case lecturerUploadOutLine.UPLOAD_OUTLINE_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            state = "";
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
