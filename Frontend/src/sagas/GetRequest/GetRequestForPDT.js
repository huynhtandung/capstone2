import { take, call, put} from 'redux-saga/effects';
import * as request from '../../constants/GetRequest/index';
import {getRequestForPDT} from '../../apis/Request/getRequest'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetRequestForPDTSuccess, actionGetRequestForPDTFail} from '../../actions/GetRequest/getRequestForPDT';

import {STATUS_CODE} from '../../constants/index';
import {numberRequestForPDT} from '../../apis/Request/getNumberRequest'
import {actionNumberRequest} from '../../actions/GetRequest/numberRequest'


 export default function * watchGetRequestForPDT(){
    while(true){
        const action = yield take(request.GET_REQUEST_FOR_PDT);
        const {params} = action.payload;
        //get so luong request cho dean
        const res = yield call(numberRequestForPDT, {})
        yield put(actionNumberRequest(res.data))
        try{
            const res = yield call(getRequestForPDT, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetRequestForPDTSuccess(data));
            }
        }catch(err){
            yield put(actionGetRequestForPDTFail(err.message));
        } 
    }
}