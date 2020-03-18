import { take, call, put} from 'redux-saga/effects';
import * as pdtConstants from '../../constants/PDTInputGrade/pdtInputGrade';
import {pdtDepartment} from '../../apis/PDTInputGrade/pdtInputGrade'
import {actionGetPDTDepartmentSuccess, actionGetPDTDepartmentFail} from '../../actions/PDTInputGrade/pdtDepartment';

import {STATUS_CODE} from '../../constants/index';


 export default function * watchPDTDepartment(){
    while(true){
        yield take(pdtConstants.PDT_DEPARTMENT);
        //const {params} = action.payload;
        try{
            const res = yield call(pdtDepartment);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetPDTDepartmentSuccess(data));
            }
        }catch(err){
            yield put(actionGetPDTDepartmentFail(err.message));
        } 
    }
}