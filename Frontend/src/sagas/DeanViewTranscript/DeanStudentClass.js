import { take, call, put} from 'redux-saga/effects';
import * as deanViewTranscriptConstants from '../../constants/DeanViewTranscript/deanViewTranscript';
import {deanStudentClass} from '../../apis/DeanViewTranscript/deanViewTranscript'
import {actionGetDeanStudentClassSuccess, actionGetDeanStudentClassFail} from '../../actions/DeanViewTranscript/deanStudentClass';

import {STATUS_CODE} from '../../constants/index';


 export default function * watchDeanStudentClass(){
    while(true){
        const action = yield take(deanViewTranscriptConstants.GET_DEAN_STUDENT_CLASS);
        const {params} = action.payload;
        try{
            const res = yield call(deanStudentClass, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetDeanStudentClassSuccess(data));
            }
        }catch(err){
            yield put(actionGetDeanStudentClassFail(err.message));
        } 
    }
}