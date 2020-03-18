'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    studentSchoolYear: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(`Select Session_Year from Session, JoinSession where Session.Session_ID = JoinSession.JS_Session_ID and JS_Student_ID = '${data.Student_ID}' Group by Session_Year `).then(function (result) {
                if(result.recordset.length !== 0)
                {
                    res.json(result.recordset)
                    db.close();
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