import { take, call, put} from 'redux-saga/effects';
import * as pdtConstants from '../../constants/PDTInputGrade/pdtInputGrade';
import {pdtOutline} from '../../apis/PDTInputGrade/pdtInputGrade'
import {actionGetLecturerDetailCourseSuccess, actionGetLecturerDetailCourseFail} from '../../actions/lecturerGetDetailCourse';

import {STATUS_CODE} from '../../constants/index';


 export default function * watchPDTOutline(){
    while(true){
        const action = yield take(pdtConstants.PDT_OUTLINE);
        const {params} = action.payload;
        try{
            const res = yield call(pdtOutline, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetLecturerDetailCourseSuccess(data));
            }
        }catch(err){
            yield put(actionGetLecturerDetailCourseFail(err.message));
        } 
    }
}