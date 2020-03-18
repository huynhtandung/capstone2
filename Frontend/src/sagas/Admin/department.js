import { take, call, put} from 'redux-saga/effects';
import * as consts from '../../constants/Admin/department';
import {getDepartment} from '../../apis/Admin';
import {actionGetDepartmentSuccess, actionGetDepartmentFail} from '../../actions/Admin/department';
import {STATUS_CODE} from '../../constants/index';


 export default function * watchGetDepartmentForAdmin(){
    while(true){
        yield take(consts.GET_DEPARTMENT_FOR_ADMIN);
        try{
            const res = yield call(getDepartment);
            const {status, data} = res;
            //console.log(res)
            if(status === STATUS_CODE.SUCCESS){
                yield put(actionGetDepartmentSuccess(data));
            }
        }catch(err){
            yield put(actionGetDepartmentFail(err.message));
        } 
    }
}