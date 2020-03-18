import { take, call, put} from 'redux-saga/effects';
import * as request from '../../constants/GetRequest/index';
import {getRequestForLecturer} from '../../apis/Request/getRequest'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetRequestForPDTSuccess, actionGetRequestForPDTFail} from '../../actions/GetRequest/getRequestForPDT';

import {STATUS_CODE} from '../../constants/index';
//import { getAnnounceForDean } from '../../apis/editGrade/editGrade';
import {numberRequestForLecturer} from '../../apis/Request/getNumberRequest'
import {actionNumberRequest} from '../../actions/GetRequest/numberRequest'

 export default function * watchGetRequestForLecturer(){
    while(true){
        const action = yield take(request.GET_REQUEST_FOR_LECTURER);
        const {params} = action.payload;
        //get so luong request cho dean
        const res = yield call(numberRequestForLecturer, params)
        yield put(actionNumberRequest(res.data))
        try{
            const res = yield call(getRequestForLecturer, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetRequestForPDTSuccess(data));
            }
        }catch(err){
            yield put(actionGetRequestForPDTFail(err.message));
        } 
    }
}