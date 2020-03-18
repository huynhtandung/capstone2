import { take, call, put} from 'redux-saga/effects';
import * as announce from '../../constants/EditGrade/announce';
import {getAnnounceForDean} from '../../apis/editGrade/editGrade'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetAnnounceSuccess, actionGetAnnounceFail} from '../../actions/EditGrade/announce';
import {numberRequestForDean} from '../../apis/Request/getNumberRequest'
import {actionNumberRequest} from '../../actions/GetRequest/numberRequest'

import {STATUS_CODE} from '../../constants/index';


 export default function * watchGetAnnounceForDean(){
    while(true){
        const action = yield take(announce.GET_ANNOUNCE_FOR_DEAN);
        const {params} = action.payload;
        //lay so luong request cua dean o trang home
        const res = yield call(numberRequestForDean, params)
        // sessionStorage.setItem('request', res.data)
        yield put(actionNumberRequest(res.data))
        try{
            const res = yield call(getAnnounceForDean, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetAnnounceSuccess(data));
            }
        }catch(err){
            yield put(actionGetAnnounceFail(err.message));
        } 
    }
}