import * as pdtConstants from '../../constants/PDTTranscript/pdtTranscript'


const initialState = {
    titleCourse : 'Choose course ',
    titleDepartment : 'Choose department ',
    titleClass : 'Choose class ',
    Course : '',
    Department : '',
    Class : '',
    showTranscript : false,
    titleTranscript : ''
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case pdtConstants.PDT_TRANSCRIPT_HANDLE_SHOW:{   
            const {data} = action.payload;
            if(data.titleCourse)
                state.titleCourse =  data.titleCourse
            if(data.titleDepartment)
                state.titleDepartment = data.titleDepartment
            if(data.titleClass)
                state.titleClass = data.titleClass
            if(data.Course)
                state.Course = data.Course
            if(data.Department)
                state.Department = data.Department
            if(data.Class)
                state.Class = data.Class
            if(data.showTranscript === true || data.showTranscript === false)
                state.showTranscript = data.showTranscript
            if(data.titleTranscript)
                state.titleTranscript = data.titleTranscript
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
