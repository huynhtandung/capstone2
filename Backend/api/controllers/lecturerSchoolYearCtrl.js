'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    lecturerSchoolYear: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(`Select Session.Session_Year from Session, Lecturer
			where Session.Session_Lecturer_ID = Lecturer.Lecturer_ID
			and Lecturer.Lecturer_ID = '${data.Lecturer_ID}'
			Group By Session.Session_Year `).then(function (result) {
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