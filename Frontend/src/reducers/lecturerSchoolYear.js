import * as lecturerSchoolYearConstants from '../constants/lecturerSchoolYear';
import * as toastify from '../commons/toastify';


const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case lecturerSchoolYearConstants.GET_LECTURER_SCHOOL_YEAR:{  
            state = [] 
            return state;
        }
        case lecturerSchoolYearConstants.GET_LECTURER_SCHOOL_YEAR_SUCCESS:{
            const {data} = action.payload;
            data.map((record, index)=>{
                return state.push(record.Session_Year)
            })
            return state;
        }
        case lecturerSchoolYearConstants.GET_LECTURER_SCHOOL_YEAR_FAIL:{
            const {error} = action.payload;
            toastify.toastifyError(error);
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
