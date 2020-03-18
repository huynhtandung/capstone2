'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    studentDetailGrade: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(`SELECT * FROM OutLine where OutLine_Session_ID = '${data.Session_ID}' `).then(function (result) {
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