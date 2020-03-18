import { take, call, put} from 'redux-saga/effects';
import * as pdtConstants from '../../constants/PDTTranscript/pdtTranscript';
import {pdtClassDepartment} from '../../apis/PDTTranscript/pdtTranscript'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetDeanClassSuccess, actionGetDeanClassFail} from '../../actions/DeanViewTranscript/deanClass';

import {STATUS_CODE} from '../../constants/index';


 export default function * watchPDTAllClass(){
    while(true){
        const action = yield take(pdtConstants.PDT_ALL_CLASS);
        const {params} = action.payload;
        try{
            const res = yield call(pdtClassDepartment, params);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetDeanClassSuccess(data));
            }
        }catch(err){
            yield put(actionGetDeanClassFail(err.message));
        } 
    }
}