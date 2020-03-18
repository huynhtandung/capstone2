import { take, call, put} from 'redux-saga/effects';
import * as pdtConstants from '../../constants/PDTInputGrade/pdtInputGrade';
import {pdtStudentClass} from '../../apis/PDTInputGrade/pdtInputGrade'
import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';

import {pdtOutline} from '../../apis/PDTInputGrade/pdtInputGrade'
import {actionGetLecturerDetailCourseSuccess, actionGetLecturerDetailCourseFail} from '../../actions/lecturerGetDetailCourse';
import { lecturerGetClassGrade } from '../../apis/lecturerGetClassGrade';

import {STATUS_CODE} from '../../constants/index';

import { actionGetLecturerClassGradeSuccess } from '../../actions/lecturerClassGrade';
import {showLoading, hideLoading} from '../../actions/loading'

 export default function * watchPDTStudentClass(){
    while(true){
        const action = yield take(pdtConstants.PDT_STUDENT_CLASS);
        const {params} = action.payload;
        yield put(showLoading())
        const globalParams = params;
        console.log("Chay: ",params)
        
        try{
            const res = yield call(pdtStudentClass, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetLecturerStudentClassSuccess(data));
                try{
                    const res = yield call(pdtOutline, params);
                    const {status, data} = res;
                    if(status === STATUS_CODE.SUCCESS){
                        yield put(actionGetLecturerDetailCourseSuccess(data));
                        try{
                            const pr = {
                                Address : '0x6DeFAd2d9841203B9C7062c143FEd7295d065aaE',
                                PrivateKey : '2c950eba9f6ddbc30db5d607f8db31b4aed7fa12fa9f74b8997cb09fb9af609e',
                                Class : globalParams.Class
                            }
                            const res = yield call(lecturerGetClassGrade, pr)
                            const {status, data} = res;
                            if(status === STATUS_CODE.SUCCESS){ 
                                yield put(actionGetLecturerClassGradeSuccess(data.bangdiem));
                            }
                        }catch(err){}
                    }
                }catch(err){
                    yield put(actionGetLecturerDetailCourseFail(err.message));
                } 
            }
        }catch(err){
            yield put(actionGetLecturerStudentClassFail(err.message));
        } 
        yield put(hideLoading())
    }
}