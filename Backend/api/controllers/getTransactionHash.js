'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    getTransactionHash: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select TrHash_ID, TrHash, DateTime from TrHash where TrHash_OutLine_ID = '${data.OutLine_ID}' Order By TrHash_ID `
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