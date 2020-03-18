'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    lecturerStudentClass: (req, res) => {
        var data= req.body;
        console.log(data)
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(`Select JoinSession.JS_Student_ID, Student.Student_Name from JoinSession, Student 
			where JoinSession.JS_Student_ID = Student.Student_ID and
		  	JoinSession.JS_Session_ID = ${data.Session_ID} `).then(function (result) {
		
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