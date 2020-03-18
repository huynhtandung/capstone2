'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    studentGradeBlockchain: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(`SELECT * FROM Dean `).then(function (result) {
                if(result.recordset.length !== 0)
                {
                    res.json(result.recordset)
                    db.close()
                }
                
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    }
}