'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    deanSchoolYear: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Session.Session_Year 
                from Session, Course, Department
                where Session.Session_Course_ID = Course.Course_ID
                and Course_Dep_ID = Department.Dep_ID
                and Department.Dep_Dean_Username = '${data.Dean_ID}'
                Group by Session.Session_Year`
            ).then(function (result) {    
                if(result.recordset.length !== 0)
                {
			
                    res.json(result.recordset)
                    db.close()
                }
                else{       
                    res.json()
                    db.close()
                }
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    deanCourse: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Course.Course_ID, Course.Course_Name, Session.Session_ID, Session.Session_Type
                from Course, Session, Department
                where Course.Course_ID = Session.Session_Course_ID and
                Course_Dep_ID = Department.Dep_ID and
                Department.Dep_Dean_Username = '${data.Dean_ID}' and
                Session.Session_Year = '${data.Session_Year}' and
                Session.Session_Semester = '${data.Session_Semester}'`
            ).then(function (result) {    
                if(result.recordset.length !== 0)
                {
			
                    res.json(result.recordset)
                    db.close()
                }
                else{       
                    res.json()
                    db.close()
                }
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    deanKhoa : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Class_Course from Class, Department
                where Class.Class_Department = Department.Dep_ID and
                Dep_Dean_Username = '${data.Dean_ID}'
                Group by Class_Course`
            ).then(function (result) {    
                if(result.recordset.length !== 0)
                {
			
                    res.json(result.recordset)
                    db.close()
                }
                else{       
                    res.json()
                    db.close()
                }
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    deanClass : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Class_ID, Class_Name from Class, Department
                where Class.Class_Department = Department.Dep_ID and
                Dep_Dean_Username = '${data.Dean_ID}' and
                Class_Course = ${data.Khoa}`
            ).then(function (result) {    
                if(result.recordset.length !== 0)
                {
			
                    res.json(result.recordset)
                    db.close()
                }
                else{       
                    res.json()
                    db.close()
                }
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    deanStudentClass: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Student.Student_ID, Student.Student_Name, Student.Student_Email
                from Student, StudentClass
                where StudentClass.Student_ID = Student.Student_ID and
                StudentClass.Class_ID = '${data.Class}'`
            ).then(function (result) {    
                if(result.recordset.length !== 0)
                {
			
                    res.json(result.recordset)
                    db.close()
                }
                else{       
                    res.json()
                    db.close()
                }
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    deanStudentCourse : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Session.Session_ID, Session.Session_Year, Session.Session_Semester, Course.Course_ID, Course.Course_Name, Session_Type, Course.Course_Number_Of_Learning_Unit
                from Session, Course, JoinSession
                where JoinSession.JS_Session_ID = Session.Session_ID and
                Session.Session_Course_ID = Course.Course_ID and
                JoinSession.JS_Student_ID = '${data.Student_ID}'`
            ).then(function (result) {    
                if(result.recordset.length !== 0)
                {
			
                    res.json(result.recordset)
                    db.close()
                }
                else{       
                    res.json()
                    db.close()
                }
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
}