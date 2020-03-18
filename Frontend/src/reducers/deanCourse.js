import * as deanCourse from '../constants/deanCourse';
import * as toastify from '../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case deanCourse.GET_DEAN_COURSE:{   
            return state;
        }
        case deanCourse.GET_DEAN_COURSE_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case deanCourse.GET_DEAN_COURSE_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
