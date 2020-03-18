'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    makeAnnounce: (req, res) => {
        var data= req.body;
        //console.log(data)
        //console.log(`insert into Announce(Session_ID, OutLine_ID, DateTime, Type, Reason) values('${data.Session_ID}', '${data.OutLine_ID}', '${data.DateTime}', 'Lecturer', '${data.Reason}'`)
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `insert into Announce(Session_ID, OutLine_ID, DateTime, Type, Reason) values('${data.Session_ID}', '${data.OutLine_ID}', '${data.DateTime}', 'Lecturer', '${data.Reason}')`
            ).then(function (result) {    
                console.log("Da tao thanh cong announce: ", result.rowsAffected)
                res.json("OK")
                db.close()
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    makeAnnounceForPDT: (req, res) => {
        var data= req.body;

        //console.log(`insert into Announce(Session_ID, OutLine_ID, DateTime, Type) values('${data.Session_ID}', '${data.OutLine_ID}', '${data.DateTime}', 'PDT')`)
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `insert into Announce(Session_ID, OutLine_ID, DateTime, Type, Reason) values('${data.Session_ID}', '${data.OutLine_ID}', '${data.DateTime}', 'PDT', '${data.Reason}')`
            ).then(function (result) {    
                console.log("Da tao thanh cong announce: ", result.rowsAffected)
                res.json("OK")
                db.close()
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    
    getAnnnounce : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Session.Session_Year, Session.Session_Semester, Lecturer.Lecturer_Name, Department.Dep_Name, Course.Course_Name, OutLine.OutLine_Name, Announce.DateTime, Announce.Session_ID,IsFinalTest, Announce.Reason, Announce.Type
                from Session, OutLine, Lecturer, Course, Department, Announce
                where Session.Session_Course_ID = Course.Course_ID and
                Session.Session_ID = OutLine.OutLine_Session_ID and
                Session.Session_Lecturer_ID = Lecturer.Lecturer_ID and
                Lecturer.Lecturer_Dep_ID = Department.Dep_ID
                and Session.Session_ID = Announce.Session_ID and
                OutLine.OutLine_ID = Announce.OutLine_ID 
                and Announce.Type = 'Lecturer' 
                
                
                or 
                Session.Session_Course_ID = Course.Course_ID and
                Session.Session_ID = OutLine.OutLine_Session_ID and
                Session.Session_Lecturer_ID = Lecturer.Lecturer_ID and
                Lecturer.Lecturer_Dep_ID = Department.Dep_ID
                and Session.Session_ID = Announce.Session_ID and
                OutLine.OutLine_ID = Announce.OutLine_ID  and
                Announce.Type = 'PDT'
                Order By Announce.ID DESC`
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
    getAnnnounceForPDT : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Session.Session_Year, Session.Session_Semester, Lecturer.Lecturer_Name, Department.Dep_Name, Course.Course_Name, OutLine.OutLine_Name, Announce.DateTime, Announce.Session_ID, IsFinalTest, Announce.Reason, Announce.Type
                from Session, OutLine, Lecturer, Course, Department, Announce
                where Session.Session_Course_ID = Course.Course_ID and
                Session.Session_ID = OutLine.OutLine_Session_ID and
                Session.Session_Lecturer_ID = Lecturer.Lecturer_ID and
                Lecturer.Lecturer_Dep_ID = Department.Dep_ID
                and Session.Session_ID = Announce.Session_ID and
                OutLine.OutLine_ID = Announce.OutLine_ID 
                and Announce.Type = 'Lecturer' Order By Announce.ID DESC`
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
    getAnnnounceForLecturer : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Session.Session_Year, Session.Session_Semester, Lecturer.Lecturer_Name, Department.Dep_Name, Course.Course_Name, OutLine.OutLine_Name, Announce.DateTime, Announce.Session_ID, IsFinalTest, Announce.Reason, Announce.Type
                from Session, OutLine, Lecturer, Course, Department, Announce
                where Session.Session_Course_ID = Course.Course_ID and
                Session.Session_ID = OutLine.OutLine_Session_ID and
                Session.Session_Lecturer_ID = Lecturer.Lecturer_ID and
                Lecturer.Lecturer_Dep_ID = Department.Dep_ID
                and Session.Session_ID = Announce.Session_ID and
                OutLine.OutLine_ID = Announce.OutLine_ID 
                and Announce.Type <> 'Lecturer' 
                and Announce.Session_ID in( Select Session.Session_ID where Session.Session_Lecturer_ID = '${data.Lecturer_ID}')
                Order By Announce.ID DESC`
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
    getAnnnounceForDean : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Session.Session_Year, Session.Session_Semester, Lecturer.Lecturer_Name, Department.Dep_Name, Course.Course_Name, OutLine.OutLine_Name, Announce.DateTime, IsFinalTest, Announce.Reason, Announce.Type
                from Session, OutLine, Lecturer, Course, Department, Announce
                where Session.Session_Course_ID = Course.Course_ID and
                Session.Session_ID = OutLine.OutLine_Session_ID and
                Session.Session_Lecturer_ID = Lecturer.Lecturer_ID and
                Course.Course_Dep_ID = Department.Dep_ID
                and Session.Session_ID = Announce.Session_ID and
                OutLine.OutLine_ID = Announce.OutLine_ID 
                and Department.Dep_Dean_Username = '${data.Dean_ID}'
                and Announce.Type = 'Lecturer' 

                or
                Session.Session_Course_ID = Course.Course_ID and
                Session.Session_ID = OutLine.OutLine_Session_ID and
                Session.Session_Lecturer_ID = Lecturer.Lecturer_ID and
                Course.Course_Dep_ID = Department.Dep_ID
                and Session.Session_ID = Announce.Session_ID and
                OutLine.OutLine_ID = Announce.OutLine_ID 
                and Department.Dep_Dean_Username = '${data.Dean_ID}'
                and Announce.Type = 'PDT'

                Order By Announce.ID DESC`
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
    }
}