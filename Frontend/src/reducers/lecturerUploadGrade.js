import * as lecturerUploadGrade from '../constants/lecturerUploadGrade';
import * as toastify from '../commons/toastify';


const initialState = "";

const reducer = (state = initialState, action) => {
    switch(action.type){
        case lecturerUploadGrade.UPLOAD_GRADE:{   
            return state;
        }
        case lecturerUploadGrade.UPLOAD_GRADE_SUCCESS:{
            const {data} = action.payload;
            state = data;
            if(data !== null)
                toastify.toastifySuceess("Upload Suceessfully")
            return state;
        }
        case lecturerUploadGrade.UPLOAD_GRADE_FAIL:{
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
