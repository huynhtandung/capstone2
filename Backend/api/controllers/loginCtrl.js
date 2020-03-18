'use strict'

const util = require('util')
var sql = require("mssql");
const db = require('../db');

module.exports = {
    login: (req, res) => {
        var data= req.body;
        db.connect().then(function () {
            var req = new sql.Request(db);
            req.query(`SELECT * FROM Student where Student_Username = '${data.username}' and Student_Password = '${data.password}' `).then(function (result) {
                if(result.recordset.length !== 0)
                {
                    res.json({message: 'Student', id: result.recordset[0].Student_ID, year: result.recordset[0].Student_Year, Name : result.recordset[0].Student_Name})
                    db.close()
                }
                else{
                    req.query(`SELECT * FROM Lecturer where Lecturer_Username = '${data.username}' and Lecturer_Password = '${data.password}' `).then(function (result) {
                        if(result.recordset.length !== 0){
                            res.json({message: 'Lecturer', id: result.recordset[0].Lecturer_ID, year: result.recordset[0].Lecturer_Year, Name : result.recordset[0].Lecturer_Name})
                            db.close()
                        }
                        else{
                            req.query(`SELECT * FROM Dean where Dean_Username = '${data.username}' and Dean_Password = '${data.password}' `).then(function (result) {
                                if(result.recordset.length !== 0){
                                    //res.json({message: 'AAD', id: result.recordset[0].AAD_Username})
                                    res.json({message: 'Dean', id: result.recordset[0].Dean_Username, year: result.recordset[0].Lecturer_Year, Name : result.recordset[0].Dean_Name})
                                    db.close()
                                }
                                else{
                                    req.query(`SELECT * FROM AcademicAffairsDepartment where AAD_Username = '${data.username}' and AAD_Password = '${data.password}' `).then(function (result) {
                                        if(result.recordset.length !== 0){
                                            res.json({message: 'AAD', id: result.recordset[0].AAD_Username,  Name : result.recordset[0].AAD_Name, head : Math.floor(Math.random() * 1000), IsHead: result.recordset[0].IsHead })
                                            db.close()
                                        }
                                        else{
                                            req.query(`SELECT * FROM Admin where Admin_Username = '${data.username}' and Admin_Password = '${data.password}' `).then(function (result) {
                                                if(result.recordset.length !== 0){
                                                    res.json({message: 'ADMIN', id: result.recordset[0].Admin_Username, walletAddress: result.recordset[0].Admin_WalletAddress})
                                                    db.close()
                                                }
                                                else{
                                                    res.json({message: 'NotFound'})
                                                    db.close()
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                        
                    })
                }
            })     
        })
        .catch(function (err) {
            res.json(err)
        });      
    }
}