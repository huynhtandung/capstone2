import * as deanViewTranscript from '../../constants/DeanViewTranscript/deanViewTranscript';
import * as toastify from '../../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case deanViewTranscript.GET_DEAN_STUDENT_COURSE:{   
            return state;
        }
        case deanViewTranscript.GET_DEAN_STUDENT_COURSE_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case deanViewTranscript.GET_DEAN_STUDENT_COURSE_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
