import * as lecturerCourseConstants from '../constants/lecturerCourse';
import * as toastify from '../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case lecturerCourseConstants.GET_LECTURER_COURSE:{   
            return state;
        }
        case lecturerCourseConstants.GET_LECTURER_COURSE_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case lecturerCourseConstants.GET_LECTURER_COURSE_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
