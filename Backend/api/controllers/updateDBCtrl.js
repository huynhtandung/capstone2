'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    isUpload: (req, res) => {
        var data= req.body;
	console.log(data)
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `update Session set Session_IsUpload = ${1} where Session_ID = '${data.Session_ID}'`
            ).then(function (result) {    
		console.log(result)
                if(result.rowsAffected.length !== 0)
                {
                    res.json({message : "OK"})
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
    getIsUpload : (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `select Session_IsUpload from Session where Session_ID = '${data.Session_ID}'`
            ).then(function (result) {    
		console.log(result)
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