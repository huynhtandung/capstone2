import * as studentSchoolYearConstants from '../constants/studentSchoolYear';
import * as toastify from '../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case studentSchoolYearConstants.GET_STUDENT_SCHOOL_YEAR:{   
            state = []
            return state;
        }
        case studentSchoolYearConstants.GET_STUDENT_SCHOOL_YEAR_SUCCESS:{
            const {data} = action.payload;
            state = [];
            data.map((record, index)=>{
                return state.push(record.Session_Year)
            })
            return state;
        }
        case studentSchoolYearConstants.GET_STUDENT_SCHOOL_YEAR_FAIL:{
          
            const {error} = action.payload;
            toastify.toastifyError(error);
            state = [];
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
