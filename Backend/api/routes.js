'use strict';

let loginCtrl = require('./controllers/loginCtrl');
let studentCourseCtrl = require('./controllers/studentCourseCtrl');
let studentDetailGradeCtrl = require('./controllers/studentDetailGradeCtrl');
let studentSchoolYearCtrl = require('./controllers/studentSchoolYearCtrl');
let studentGradeBlockchainCtrl = require('./controllers/studentGradeBlockchainCtrl');

let lectureCourseCtrl = require('./controllers/lecturerCourseCtrl');
let lecturerDetailCourseCtrl = require('./controllers/lecturerDetailCourseCtrl');
let lecturerStudentClassCtrl = require('./controllers/lecturerStudentClassCtrl');
let lecturerSchoolYearCtrl = require('./controllers/lecturerSchoolYearCtrl');
let blockchain = require('./controllers/blockchain');
let updateDBCtrl = require('./controllers/updateDBCtrl');
let studentAllCourse = require('./controllers/studentAllCourse');

let deanCtrl = require('./controllers/deanCtrl');

let pdtCtrl = require('./controllers/pdtCtrl');

let exportExcelCtrl  = require('./controllers/exportExcelCtrl')

let editGradeAnnounce = require ('./controllers/editGradeAnnounce.js')
let request = require('./controllers/request')

let transaction = require('./controllers/getTransactionHash');

let privateKeyCtrl = require('./controllers/privateKeyCtrl')

let adminCtrl = require('./controllers/adminController');

let studentFeedbackCtrl = require('./controllers/studentFeedbackCtrl');



module.exports = function(app) {

  app.route('/create-feedback')
    .post(studentFeedbackCtrl.createFeedback)

  app.route('/check-phien-request')
    .post(privateKeyCtrl.checkPhienRequest)
    
  app.route('/check-private-key')
    .post(privateKeyCtrl.checkPrivateKey)
  app.route('/check-end-date-session')
    .post(privateKeyCtrl.checkEndDateSession)

  app.route('/get-transaction-hash')
    .post(transaction.getTransactionHash);
  app.route('/get-transaction-data')
    .post(blockchain.getTransactionData);

  app.route('/login')
    .post(loginCtrl.login);

  app.route('/student-course')
    .post(studentCourseCtrl.studentCourse);
  
  app.route('/student-detail-grade')
    .post(studentDetailGradeCtrl.studentDetailGrade);
  
  app.route('/student-school-year')
    .post(studentSchoolYearCtrl.studentSchoolYear);

  app.route('/student-grade-blockchain')
     .post(studentGradeBlockchainCtrl.studentGradeBlockchain);

  app.route('/lecturer-course')
    .post(lectureCourseCtrl.lecturerCourse);

  app.route('/lecturer-detail-course')
    .post(lecturerDetailCourseCtrl.lecturerDetailCourse);
  
  app.route('/lecturer-student-class')
    .post(lecturerStudentClassCtrl.lecturerStudentClass);

  app.route('/lecturer-school-year')
    .post(lecturerSchoolYearCtrl.lecturerSchoolYear);
  
  app.route('/student-get-grade-one-class')
    .post(blockchain.getGradeStudent);

  app.route('/grade-class')
    .post(blockchain.getGradeClass);

 app.route('/all-grade-student')
    .post(blockchain.getAllGradeStudent);
  
  app.route('/upload-student')
    .post(blockchain.uploadStudent);

  app.route('/upload-grade')
    .post(blockchain.uploadGrade);

  app.route('/upload-percent')
    .post(blockchain.uploadPercent);
  app.route('/upload-student-percent')
    .post(blockchain.uploadStudentPercent)
  app.route('/get-status')
    .post(blockchain.getStatus)
  app.route('/accept-req')
    .post(blockchain.acceptReq)
  app.route('/send-request')
    .post(blockchain.sendRequest)

 app.route('/is-upload')
    .post(updateDBCtrl.isUpload);

 app.route('/get-is-upload')
    .post(updateDBCtrl.getIsUpload);

 app.route('/student-all-course')
    .post(studentAllCourse.studentAllCourse)

  app.route('/dean-school-year')
    .post(deanCtrl.deanSchoolYear)
  
  app.route('/dean-course')
    .post(deanCtrl.deanCourse)
  
  app.route('/dean-khoa')
    .post(deanCtrl.deanKhoa)
  app.route('/dean-class')
    .post(deanCtrl.deanClass);
  app.route('/dean-student-class')
    .post(deanCtrl.deanStudentClass)
  app.route('/dean-student-course')
    .post(deanCtrl.deanStudentCourse)

  app.route('/pdt-school-year')
    .get(pdtCtrl.pdtSchoolYear)
  app.route('/pdt-department')
    .get(pdtCtrl.pdtDepartment)
  app.route('/pdt-course')
    .post(pdtCtrl.pdtCourse)
  app.route('/pdt-student-class')
    .post(pdtCtrl.pdtStudentClass)
  app.route('/pdt-outline')
    .post(pdtCtrl.pdtOutLine)

  //pdt view transcript
  app.route('/pdt-all-course')
    .get(pdtCtrl.pdtAllCourse)
  app.route('/pdt-all-department')
    .get(pdtCtrl.pdtAllDepartment)
  app.route('/pdt-all-class-department')
    .post(pdtCtrl.pdtAllClassDepartment)
  app.route('/pdt-all-student-class')
    .post(pdtCtrl.pdtAllStudentClass)

  app.route('/export-excel/:sesionID')
    .get(exportExcelCtrl.exportExcelStudentList)

  app.route('/make-announce')
    .post(editGradeAnnounce.makeAnnounce)
  app.route('/make-announce-for-pdt')
    .post(editGradeAnnounce.makeAnnounceForPDT)
  app.route('/get-announce')
    .post(editGradeAnnounce.getAnnnounce)
  app.route('/get-announce-for-dean')
    .post(editGradeAnnounce.getAnnnounceForDean)
  app.route('/get-announce-for-pdt')
    .post(editGradeAnnounce.getAnnnounceForPDT)
  app.route('/get-announce-for-lecturer')
    .post(editGradeAnnounce.getAnnnounceForLecturer)

  app.route('/make-request')
    .post(request.makeRequest)
  app.route('/get-request-for-dean')
    .post(request.getRequestForDean)
  app.route('/get-request-for-pdt')
    .post(request.getRequestForPDT)
  app.route('/update-request-for-pdt')
    .post(request.updateRequestForPDT)
  app.route('/update-request-for-dean')
    .post(request.updateRequestForDean)
  app.route('/get-request-for-lecturer')
    .post(request.getRequestForLecturer)
  app.route('/update-request-for-lecturer')
    .post(request.updateRequestForLecturer)
  app.route('/number-request-for-dean')
    .post(request.getNumberRequestForDean)
  app.route('/number-request-for-pdt')
    .post(request.getNumberRequestForPDT)
  app.route('/number-request-for-lecturer')
    .post(request.getNumberRequestForLecturer)
  
  app.route('/get-balance')
    .post(blockchain.getBalance)
  
  app.route('/send-eth')
    .post(blockchain.sendEth)

  app.route('/get-department-for-admin')
    .get(adminCtrl.getDepartment)
  app.route('/get-wallet-address-by-department')
    .post(adminCtrl.getWalletAddressByDepartment)
}