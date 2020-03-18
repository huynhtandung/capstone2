'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    makeRequest: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Insert into Request(Lecturer_ID, Session_ID, OutLine_ID, Grade, DateTime, AcceptByPDT, AcceptByDean, STT, OldGrade, HasUpload, Reason)
                values('${data.Lecturer_ID}', '${data.Session_ID}', '${data.OutLine_ID}','${data.Grade}', '${data.DateTime}', 0, 0, ${data.STT}, '${data.OldGrade}', 0, '${data.Reason}')`
            ).then(function (result) {    
                console.log("Da tao thanh cong request: ", result.rowsAffected)
                res.json("OK")
                db.close()
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    getRequestForDean : (req, res) => {
        var data= req.body;
        //and Request.AcceptByDean = 0
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `select Lecturer.Lecturer_Name, Course.Course_Name, OutLine.OutLine_Name, Request.DateTime, Department.Dep_Name, Request.AcceptByDean,
                Session.Session_Year, Session.Session_Semester, Session.Session_ID, Course.Course_ID, Request.ID, Request.STT, Request.Grade, Request.OldGrade, Request.Reason
                from Request, Lecturer, Session, Course, OutLine, Department
                where Request.Session_ID = Session.Session_ID and
                Session.Session_Lecturer_ID = Lecturer.Lecturer_ID
                and Session.Session_Course_ID = Course.Course_ID
                and Request.OutLine_ID = OutLine.OutLine_ID
                and Course.Course_Dep_ID = Department.Dep_ID
                and Department.Dep_Dean_Username = '${data.Dean_ID}'
                Order By Request.ID DESC `
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
    getRequestForPDT : (req, res) => {
        var data= req.body;
        //and Request.AcceptByPDT = 0
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `select Lecturer.Lecturer_Name, Course.Course_Name, OutLine.OutLine_Name, Request.DateTime, Department.Dep_Name, Request.AcceptByPDT ,
				Session.Session_Year, Session.Session_Semester, Session.Session_ID, Course.Course_ID, Request.ID, Request.STT, Request.Grade, Request.OldGrade, Request.Reason
                from Request, Lecturer, Session, Course, OutLine, Department
                where Request.Session_ID = Session.Session_ID and
                Session.Session_Lecturer_ID = Lecturer.Lecturer_ID
                and Session.Session_Course_ID = Course.Course_ID
                and Request.OutLine_ID = OutLine.OutLine_ID
                and Course.Course_Dep_ID = Department.Dep_ID
                Order By Request.ID DESC `
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
    updateRequestForPDT: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Update Request set AcceptByPDT = ${data.Decision} where ID = ${data.ID}`
            ).then(function (result) {    
                res.json("OK")
                db.close()
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    updateRequestForDean: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Update Request set AcceptByDean = ${data.Decision} where ID = ${data.ID}`
            ).then(function (result) {    
                res.json("OK")
                db.close()
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    getRequestForLecturer: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `select Lecturer.Lecturer_Name, Course.Course_Name, OutLine.OutLine_Name, Request.DateTime, Department.Dep_Name, Request.AcceptByPDT, Request.AcceptByDean,
				Session.Session_Year, Session.Session_Semester, Session.Session_ID, Course.Course_ID, Request.ID, Request.STT, Request.HasUpload, Request.Grade, Request.OutLine_ID, Request.OldGrade
                from Request, Lecturer, Session, Course, OutLine, Department
                where Request.Session_ID = Session.Session_ID and
                Session.Session_Lecturer_ID = Lecturer.Lecturer_ID
                and Session.Session_Course_ID = Course.Course_ID
                and Request.OutLine_ID = OutLine.OutLine_ID
                and Course.Course_Dep_ID = Department.Dep_ID
				and AcceptByPDT <> 0 and
				AcceptByDean <> 0 and
				Request.Lecturer_ID = '${data.Lecturer_ID}'
                Order By Request.ID DESC`
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
    updateRequestForLecturer : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `update Request set HasUpload = ${data.Value} where ID = ${data.ID}`
            ).then(function (result) {    
                res.json("OK")
                db.close()
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    getNumberRequestForDean : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Request.ID
                from Request, Session, Department, Course
                where Request.Session_ID = Session.Session_ID
                and Session.Session_Course_ID = Course.Course_ID
                and Course.Course_Dep_ID = Department.Dep_ID
                and Department.Dep_Dean_Username = '${data.Dean_ID}'
                and AcceptByDean = 0`
            ).then(function (result) {    
                res.json(result.recordset.length)
                db.close()
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    getNumberRequestForPDT : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `select Request.AcceptByPDT from Request where AcceptByPDT = 0`
            ).then(function (result) {    
                res.json(result.recordset.length)
                db.close()
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    getNumberRequestForLecturer : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `select Request.ID
                from Request, Lecturer, Session, Course, OutLine, Department
                where Request.Session_ID = Session.Session_ID and
                Session.Session_Lecturer_ID = Lecturer.Lecturer_ID
                and Session.Session_Course_ID = Course.Course_ID
                and Request.OutLine_ID = OutLine.OutLine_ID
                and Course.Course_Dep_ID = Department.Dep_ID
                and AcceptByPDT <> 0 and
                AcceptByDean <> 0 and
                HasUpload = 0 and
                Request.Lecturer_ID = '${data.Lecturer_ID}'
                Order By Request.ID DESC`
            ).then(function (result) {    
                res.json(result.recordset.length)
                db.close()
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
}