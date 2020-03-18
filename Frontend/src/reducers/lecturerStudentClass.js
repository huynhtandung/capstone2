import * as lecturerStudentClass from '../constants/lecturerStudentClass';
import * as toastify from '../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case lecturerStudentClass.GET_LECTURER_STUDENT_CLASS:{  
            return state;
        }
        case lecturerStudentClass.GET_LECTURER_STUDENT_CLASS_SUCCESS:{
            const {data} = action.payload;
            state = data;
            return state;
        }
        case lecturerStudentClass.GET_LECTURER_STUDENT_CLASS_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
