'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    checkPrivateKey: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select WalletAddress, PrivateKey from ${data.Table} where ${data.KeyID} = '${data.ValueID}' and PrivateKey = '${data.PrivateKey}'`
            ).then(function (result) {    
                if(result.recordset.length !== 0)
                {
                    res.json(result.recordset[0])
                    db.close()
                }
                else{       
                    res.json(null)
                    db.close()
                }
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    checkEndDateSession: (req, res) => {
        var data= req.body;
        console.log(data)
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Session.Session_End_Date from Session where Session.Session_ID = '${data.Session_ID}'`
            ).then(function (result) {    
                if(result.recordset.length !== 0)
                {
                    res.json(result.recordset[0])
                    db.close()
                }
                else{       
                    res.json(null)
                    db.close()
                }
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
    checkPhienRequest: (req, res) => {
        var data= req.body;
        console.log(data)
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select * from Request where OutLine_ID = '${data.OutLine_ID} ' and AcceptByDean <> 0 and AcceptByPDT <> 0 and HasUpload = 0`
            ).then(function (result) {    
                if(result.recordset.length !== 0)
                {
                    res.json(result.recordset[0])
                    db.close()
                }
                else{       
                    res.json(null)
                    db.close()
                }
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
}