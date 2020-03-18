import { take, call, put} from 'redux-saga/effects';
import * as pdtConstants from '../../constants/PDTTranscript/pdtTranscript';
import {pdtAllCourse} from '../../apis/PDTTranscript/pdtTranscript'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetDeanKhoaSuccess, actionGetDeanKhoaFail} from '../../actions/DeanViewTranscript/deanKhoa';

import {STATUS_CODE} from '../../constants/index';
import {numberRequestForPDT} from '../../apis/Request/getNumberRequest'
import {actionNumberRequest} from '../../actions/GetRequest/numberRequest'

 export default function * watchPDTAllCourse(){
    while(true){
        yield take(pdtConstants.PDT_ALL_COURSE);
        //get so luong request cho dean
        const res = yield call(numberRequestForPDT, {})
        yield put(actionNumberRequest(res.data))
        try{
            const res = yield call(pdtAllCourse);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetDeanKhoaSuccess(data));
            }
        }catch(err){
            yield put(actionGetDeanKhoaFail(err.message));
        } 
    }
}