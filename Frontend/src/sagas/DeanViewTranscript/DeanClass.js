import { take, call, put} from 'redux-saga/effects';
import * as deanViewTranscriptConstants from '../../constants/DeanViewTranscript/deanViewTranscript';
import {deanClass} from '../../apis/DeanViewTranscript/deanViewTranscript'
import {actionGetDeanClassSuccess, actionGetDeanClassFail} from '../../actions/DeanViewTranscript/deanClass';

import {STATUS_CODE} from '../../constants/index';


 export default function * watchDeanClass(){
    while(true){
        const action = yield take(deanViewTranscriptConstants.GET_DEAN_CLASS);
        const {params} = action.payload;
        try{
            const res = yield call(deanClass, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetDeanClassSuccess(data));
            }
        }catch(err){
            yield put(actionGetDeanClassFail(err.message));
        } 
    }
}