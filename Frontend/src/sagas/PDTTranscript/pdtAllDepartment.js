import { take, call, put} from 'redux-saga/effects';
import * as pdtConstants from '../../constants/PDTTranscript/pdtTranscript';
import {pdtAllDepartment} from '../../apis/PDTTranscript/pdtTranscript'
//import {actionGetLecturerStudentClassSuccess, actionGetLecturerStudentClassFail} from '../../actions/lecturerGetStudentClass';
import {actionGetPDTDepartmentSuccess, actionGetPDTDepartmentFail} from '../../actions/PDTInputGrade/pdtDepartment'

import {STATUS_CODE} from '../../constants/index';


 export default function * watchPDTAllDepartment(){
    while(true){
        yield take(pdtConstants.PDT_ALL_DEPARTMENT);
        try{
            const res = yield call(pdtAllDepartment);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetPDTDepartmentSuccess(data));
            }
        }catch(err){
            yield put(actionGetPDTDepartmentFail(err.message));
        } 
    }
}