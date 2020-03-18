import { take, call, put} from 'redux-saga/effects';
import * as pdtConstants from '../../constants/PDTTranscript/pdtTranscript';
import {pdtStudentClass} from '../../apis/PDTTranscript/pdtTranscript'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetDeanStudentClassSuccess, actionGetDeanStudentClassFail} from '../../actions/DeanViewTranscript/deanStudentClass';

import {STATUS_CODE} from '../../constants/index';


 export default function * watchPDTAllStudentClass(){
    while(true){
        const action = yield take(pdtConstants.PDT_ALL_STUDENT_CLASS);
        const {params} = action.payload;
        try{
            const res = yield call(pdtStudentClass, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetDeanStudentClassSuccess(data));
            }
        }catch(err){
            yield put(actionGetDeanStudentClassFail(err.message));
        } 
    }
}