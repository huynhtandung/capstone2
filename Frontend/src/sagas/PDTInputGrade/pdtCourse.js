import { take, call, put} from 'redux-saga/effects';
import * as pdtConstants from '../../constants/PDTInputGrade/pdtInputGrade';
import {pdtCourse} from '../../apis/PDTInputGrade/pdtInputGrade'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetStudentCourseSuccess, actionGetStudentCourseFail} from '../../actions/studentCourse';

import {STATUS_CODE} from '../../constants/index';


 export default function * watchPDTCourse(){
    while(true){
        const action = yield take(pdtConstants.PDT_COURSE);
        const {params} = action.payload;
        try{
            const res = yield call(pdtCourse, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetStudentCourseSuccess(data));
            }
        }catch(err){
            yield put(actionGetStudentCourseFail(err.message));
        } 
    }
}