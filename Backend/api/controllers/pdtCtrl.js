'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    pdtSchoolYear: (req, res) => {
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Session_Year from Session group by Session_Year`
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
    pdtDepartment: (req, res) => {
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Dep_ID, Dep_Name from Department`
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
    pdtCourse : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Session.Session_ID, Session.Session_Type, Course_Name, Course_Number_Of_Learning_Unit, Course.Course_ID, Session.Session_End_Date
                from Session, Course
                where Session.Session_Course_ID = Course.Course_ID
                and Session.Session_Year = '${data.Year}'
                and Session.Session_Semester = '${data.Semester}'
                and Course.Course_Dep_ID = '${data.Department}'`
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
    pdtStudentClass : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select JoinSession.JS_Student_ID, Student_Name
                from JoinSession, Student
                where Student.Student_ID = JoinSession.JS_Student_ID and
                JoinSession.JS_Session_ID = '${data.Session_ID}'`
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
    pdtOutLine : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select * from OutLine where OutLine.OutLine_Session_ID = '${data.Session_ID}'`
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

    pdtAllCourse : (req, res) => {
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Class_Course from Class Group by Class_Course`
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
    pdtAllDepartment : (req, res) => {
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select * from Department`
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
    pdtAllClassDepartment : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Class_ID, Class_Name from Class
                where Class.Class_Department = '${data.Department}'
                and Class_Course = '${data.Course}'`
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
    pdtAllStudentClass : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select StudentClass.*, Student.Student_Name from StudentClass, Student
                where StudentClass.Class_ID = '${data.Class_ID}'
                and StudentClass.Student_ID = Student.Student_ID`
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