'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    lecturerCourse: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Course.Course_ID, Course.Course_Name, Session.Session_ID, Session.Session_Type, Session.Session_End_Date
		from Course, Session
		where Course.Course_ID = Session.Session_Course_ID and
		Session_Lecturer_ID = '${data.Lecturer_ID}' and
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
    }
}