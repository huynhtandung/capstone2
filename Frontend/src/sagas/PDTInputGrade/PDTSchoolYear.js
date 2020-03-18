import { take, call, put} from 'redux-saga/effects';
import * as pdtConstants from '../../constants/PDTInputGrade/pdtInputGrade';
import {pdtSchoolYear} from '../../apis/PDTInputGrade/pdtInputGrade'
import {actionGetStudentSchoolYearSuccess, actionGetStudentSchoolYearFail} from '../../actions/studentGetSchoolYear';

import {STATUS_CODE} from '../../constants/index';
import {numberRequestForPDT} from '../../apis/Request/getNumberRequest'
import {actionNumberRequest} from '../../actions/GetRequest/numberRequest'

 export default function * watchPDTSchoolYear(){
    while(true){
        yield take(pdtConstants.PDT_SCHOOL_YEAR);
        //get so luong request cho dean
        const res = yield call(numberRequestForPDT, {})
        yield put(actionNumberRequest(res.data))
        try{
            const res = yield call(pdtSchoolYear);
            const {status, data} = res;
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetStudentSchoolYearSuccess(data));
            }
        }catch(err){
            yield put(actionGetStudentSchoolYearFail(err.message));
        } 
    }
}