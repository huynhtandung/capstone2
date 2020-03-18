import {combineReducers} from 'redux';
import login from './login';
import studentCourse from './studentCourse';
import studentDetailGrade from './studentDetailGrade';
import studentIsShowDetailGrade from './studentIsShowDetailGrade';
import studentGradeBlockchain from './studentGradeBlockchain';
import studentSchoolYear from './studentSchoolYear';
import studentGetAllClass from './studentGetAllClass';
import studentGetAllGrade  from './studentGetAllGrade';

import lecturerSchoolYear from './lecturerSchoolYear';
import lecturerDetailCourse from './lecturerDetailCourse';
import lecturerCourse from './lecturerCourse';
import lecturerStudentClass from './lecturerStudentClass';
import lecturerHandleShow from './lecturerHandleShow';
import lecturerUploadStudent from './lecturerUploadStudent';
import lecturerUploadOutLine from './lecturerUploadOutLine';
import lecturerUploadGrade from './lecturerUploadGrade';
import lecturerClassGrade from './lecturerClassGrade';

import loading from './loading';

import deanSchoolYear from './deanSchoolYear';
import deanCourse from './deanCourse';

import deanKhoa from './DeanViewTranscript/deanKhoa'
import deanClass from './DeanViewTranscript/deanClass'
import deanStudentClass from './DeanViewTranscript/deanStudentClass'
import deanStudentCourse from './DeanViewTranscript/deanStudentCourse'
import deanHandleShow from './DeanViewTranscript/deanHandleShow'

import pdtDepartment from './PDTInputGrade/pdtDepartment';
import pdtHandleShow from './PDTInputGrade/pdtHandleShow'

import pdtTranscriptHandleShow from './PDTTranscript/pdtTranscriptHandleShow';
import titleDropdown from './titleDropdown';
import getAnnounce from './EditGrade/announce'

import getRequest from './GetRequest/getRequest'

import numberRequest from './GetRequest/numberRequest'

import transaction from './Transaction/transaction'

import department from './Admin/department'
import balance from './Admin/getBalance'
import walletAddress from './Admin/walletAddress'




const appReducer = combineReducers({
    login : login,

    studentCourse : studentCourse,
    studentDetailGrade : studentDetailGrade,
    studentIsShowDetailGrade : studentIsShowDetailGrade,
    studentGradeBlockchain : studentGradeBlockchain,
    studentSchoolYear : studentSchoolYear,
    studentGetAllClass : studentGetAllClass,
    studentGetAllGrade : studentGetAllGrade,
    
    lecturerSchoolYear : lecturerSchoolYear,
    lecturerDetailCourse : lecturerDetailCourse,
    lecturerCourse : lecturerCourse,
    lecturerStudentClass : lecturerStudentClass,
    lecturerHandleShow: lecturerHandleShow,

    lecturerUploadStudent : lecturerUploadStudent,
    lecturerUploadOutLine : lecturerUploadOutLine,
    lecturerUploadGrade : lecturerUploadGrade,

    lecturerClassGrade : lecturerClassGrade,

    loading : loading,

    titleDropdown : titleDropdown,

    deanSchoolYear : deanSchoolYear,
    deanCourse : deanCourse,

    //dean view tráncript
    deanKhoa,
    deanClass,
    deanStudentClass, 
    deanStudentCourse,
    deanHandleShow,

    pdtDepartment,
    pdtHandleShow,

    pdtTranscriptHandleShow,

    getAnnounce,

    getRequest,

    numberRequest,
    
    transaction,


    departmentForAdmin : department,

    balance : balance,

    walletAddress : walletAddress
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'USER_LOGGED_OUT') {
      state = undefined;
    }
  
    return appReducer(state, action);
  };

export default rootReducer;
