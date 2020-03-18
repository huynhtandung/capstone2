'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    studentCourse: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Course.Course_ID, Course.Course_Name, Lecturer.Lecturer_Name, Session_ID, Session.Session_Type, Session.Session_End_Date
                from Course, Session, JoinSession, Lecturer where 
                JS_Session_ID = Session_ID and
                Session_Course_ID = Course_ID and
                Lecturer_ID = Session_Lecturer_ID and
                JS_Student_ID = '${data.Student_ID}' and 
                Session_Year = '${data.Session_Year}' and
                Session_Semester = '${data.Session_Semester}'`
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