'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    createFeedback: (req, res) => {
        var data= req.body;
       // console.log("Data: ", data)
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Insert into Announce(Session_ID, OutLine_ID, DateTime, Type, Reason) values('${data.Session_ID}','${data.OutLine_ID}','${data.DateTime}','${data.Type}','${data.Reason}')`
            ).then(function (result) {    
                    res.json(true)
                    db.close()
                }    
            )
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
}