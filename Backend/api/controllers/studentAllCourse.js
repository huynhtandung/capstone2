'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    studentAllCourse: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Session.Session_ID, Session.Session_Year, Session.Session_Semester, Course.Course_ID, Course.Course_Name, Course.Course_Number_Of_Learning_Unit,  Session.Session_Type
		 from Session, Course, JoinSession
		where Session.Session_Course_ID = Course.Course_ID and
		Session.Session_ID = JoinSession.JS_Session_ID and
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
    }
}