import * as lecturerUploadStudent from '../constants/lecturerUploadStudent';
import * as toastify from '../commons/toastify';


const initialState = "";

const reducer = (state = initialState, action) => {
    switch(action.type){
        case lecturerUploadStudent.UPLOAD_STUDENT:{   
            return state;
        }
        case lecturerUploadStudent.UPLOAD_STUDENT_SUCCESS:{
            const {data} = action.payload;
            state = data.transactionHash;
            //toastify.toastifySuceess("Loading 30%")
            return state;
        }
        case lecturerUploadStudent.UPLOAD_STUDENT_FAIL:{
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
