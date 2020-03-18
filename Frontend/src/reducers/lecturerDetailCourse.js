import * as lecturerDetailCourse from '../constants/lecturerDetailCourse';
import * as toastify from '../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case lecturerDetailCourse.GET_LECTURE_DETAIL_COURSE:{      
            return state;
        }
        case lecturerDetailCourse.GET_LECTURE_DETAIL_COURSE_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case lecturerDetailCourse.GET_LECTURE_DETAIL_COURSE_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
