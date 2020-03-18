import * as lecturerHandleShow  from '../constants/lecturerHandleShow';


const initialState = {
    "Course" : "",
    "IsShow" : false,
    "Title" : "",
    "ViewClassGrade" : false,
    "OutlineUpload" : 0,
    "IsUploadStudent" : false,
    "IsUploadOutline" : false,
    "IsEditGrade" : [],
    "ViewHistoryGrade" : false,
    "stt" : ''
   
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case lecturerHandleShow.LECTURER_SHOW:{
            const {data} = action.payload;
            if(data.Course !== null && data.Course)
                state.Course = data.Course;
            if(data.IsShow === false || data.IsShow === true)
                state.IsShow = data.IsShow;
            if(data.Title !== null && data.Title)
                state.Title = data.Title
            if(data.ViewClassGrade === false || data.ViewClassGrade === true)
                state.ViewClassGrade = data.ViewClassGrade
            if(data.OutlineUpload !== null &&data.OutlineUpload)
                state.OutlineUpload = data.OutlineUpload

            if(data.IsUploadStudent === false || data.IsUploadStudent === true)
                state.IsUploadStudent = data.IsUploadStudent;
            if(data.IsUploadStudent === false || data.IsUploadStudent === true)
                state.IsUploadOutline = data.IsUploadOutline;
            if(data.IsEditGrade)
                state.IsEditGrade = data.IsEditGrade
            if(data.ViewHistoryGrade === false || data.ViewHistoryGrade === true)
                state.ViewHistoryGrade = data.ViewHistoryGrade
            //console.log("Data: ",data.ViewClassGrade)
            //console.log("State: ",state.ViewClassGrade)
            if(data.stt || data.stt === 0){
                state.stt = data.stt
                console.log('Set stt vao store', state.stt)
            }
            return state;
        }
        case lecturerHandleShow.LECTURER_NOT_SHOW:{
            return state;
        }
        default :
            return state;
    }
};


export default reducer;
