'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    getDepartment: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(
                `Select Department.Dep_ID, Department.Dep_Name from Department`
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
    },
    getWalletAddressByDepartment: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            if(data.Type === 'AAD'){
                req.query(
                    'Select AAD_Username, AcademicAffairsDepartment.AAD_Name,   AcademicAffairsDepartment.WalletAddress from AcademicAffairsDepartment'
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
            }
            else{
                if(data.Type === 'DEAN'){
                    req.query(
                        'Select Dean_Username, Dean_Name,   Dean.WalletAddress from Dean'
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
                }else{
                    req.query(
                        `Select Lecturer.Lecturer_ID, Lecturer.Lecturer_Name,  Lecturer.WalletAddress from Lecturer where Lecturer.Lecturer_Dep_ID = '${data.Dep_ID}'`
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
                }
            }
        })
        .catch(function (err) {
            res.json(err)
        });      
    },
}