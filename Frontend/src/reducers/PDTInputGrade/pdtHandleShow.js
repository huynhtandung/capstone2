import * as pdtConstants from '../../constants/PDTInputGrade/pdtInputGrade'


const initialState = {
    titleSchoolYear : 'Choose school year and semester ',
    titleDepartment : 'Choose department ',
    Year : '',
    Semester : '',
    showStudentClass : false,
    hadFinalExam : false,
    Course : '',
    ViewClassGrade : false,
    stt : ''
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case pdtConstants.PDT_HANDLE_SHOW:{   
            const {data} = action.payload;
            if(data.titleSchoolYear)
                state.titleSchoolYear =  data.titleSchoolYear
            if(data.Year)
                state.Year =  data.Year
            if(data.Semester)
                state.Semester =  data.Semester
            if(data.titleDepartment)
                state.titleDepartment = data.titleDepartment
            if(data.showStudentClass || data.showStudentClass ===false)
                state.showStudentClass = data.showStudentClass
            if(data.hadFinalExam || data.hadFinalExam === false)
                state.hadFinalExam = data.hadFinalExam
            if(data.Course)
                state.Course = data.Course
            if(data.ViewClassGrade === false || data.ViewClassGrade ===true)
                state.ViewClassGrade = data.ViewClassGrade
            if(data.stt)
                state.stt = data.stt
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
