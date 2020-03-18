import { take, call, put} from 'redux-saga/effects';
import * as deanViewTranscriptConstants from '../../constants/DeanViewTranscript/deanViewTranscript';
import {deanKhoa} from '../../apis/DeanViewTranscript/deanViewTranscript'
import {actionGetDeanKhoaSuccess, actionGetDeanKhoaFail} from '../../actions/DeanViewTranscript/deanKhoa';

import {STATUS_CODE} from '../../constants/index';

import {numberRequestForDean} from '../../apis/Request/getNumberRequest'
import {actionNumberRequest} from '../../actions/GetRequest/numberRequest'



 export default function * watchDeanKhoa(){
    while(true){
        const action = yield take(deanViewTranscriptConstants.GET_DEAN_KHOA);
        const {params} = action.payload;
        //get so luong request cho dean
        const res = yield call(numberRequestForDean, params)
        yield put(actionNumberRequest(res.data))
        try{
            const res = yield call(deanKhoa, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetDeanKhoaSuccess(data));
            }
        }catch(err){
            yield put(actionGetDeanKhoaFail(err.message));
        } 
    }
}