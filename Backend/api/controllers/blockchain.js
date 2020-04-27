"use strict";

const util = require("util");
var sql = require("mssql");
const db = require("../db");
const blockchain = require("../../BC/index");
const transaction = require("../../BC/transactiondata");

const GetTransaction = require("../../BC/GetAdd/getTransaction");

//var address = "0x6DeFAd2d9841203B9C7062c143FEd7295d065aaE";
//var privateKey = "2c950eba9f6ddbc30db5d607f8db31b4aed7fa12fa9f74b8997cb09fb9af609e";

module.exports = {
  getTransactionData: (req, res) => {
    var data = req.body;
    var req = new sql.Request(db);
    try {
      transaction.getData(data.ListTransactionHash).then(function (re) {
        res.json(re);
      });
    } catch (err) {
      console.log(err);
    }
  },
  getGradeStudent: (req, res) => {
    console.log("CHAY ne");
    var data = req.body;
    var req = new sql.Request(db);
    try {
      var bc = new blockchain(data.Address, data.PrivateKey);
      bc.get1sv(data.Class, data.Student_ID).then(function (re) {
        res.json(re);
      });
    } catch (err) {
      console.log(err);
    }
  },
  getGradeClass: (req, res) => {
    var data = req.body;
    try {
      console.log("GET GRADE CLASS");
      var bc = new blockchain(data.Address, data.PrivateKey);
      bc.getAll(data.Class).then(function (re) {
        console.log(re);
        res.json(re);
      });
    } catch (err) {
      console.log(err);
    }
  },
  uploadStudent: (req, res) => {
    var data = req.body;
    /*try{
            var bc = new blockchain(data.Address, data.PrivateKey);
            bc.addsv(data.Class, data.ArrayStudent).then(function(re){
                res.json(re)
            });
        }catch(err){
            console.log(err)
        }*/
  },
  uploadGrade: async (req, res) => {
    var data = req.body;

    try {
      var bc = new blockchain(data.Address, data.PrivateKey);
      bc.addgr(data.Class, data.ArrayGrade, data.id).then(function (re) {
        res.json(re);
        let getTransaction = new GetTransaction(re);
        //console.log('data upload grade', re)
        //lu transaction hash
        db.connect()
          .then(async function () {
            var req = new sql.Request(db);
            let d = new Date();
            let dateTime = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}/${
              d.getMonth() + 1
            }/${d.getFullYear()}`;
            req
              .query(
                `Insert into TrHash(TrHash_OutLine_ID, TrHash, DateTime) values('${data.outlineID}','${re}', '${dateTime}')`
              )
              .then(async function (result) {
                const res1 = await getTransaction.Fee();
                /*console.log(res1)
                        console.log(`Update Wallet set Balance = Balance - ${+res1} where WalletAddress = ${data.Address}`)*/
                req
                  .query(
                    `Update Wallet set Balance = ROUND(Balance - ${+res1}, 8) where WalletAddress = '${
                      data.Address
                    }'`
                  )
                  .then(function (result) {
                    db.close();
                  });
              });
          })
          .catch(function (err) {
            res.json(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  },
  uploadPercent: (req, res) => {
    var data = req.body;
    /*try{
            var bc = new blockchain(data.Address, data.PrivateKey);
            bc.addper(data.ArrayPercent, data.Class).then(function(re){
                res.json(re)
            });
        }catch(err){
            console.log(err)
        }*/
  },

  uploadStudentPercent: (req, res) => {
    var data = req.body;
    try {
      var bc = new blockchain(data.Address, data.PrivateKey);
      bc.addsv_perc(data.Class, data.ArrayStudent, data.ArrayPercent).then(
        function (re) {
          res.json(re);
        }
      );
    } catch (err) {
      console.log(err);
    }
  },

  getAllGradeStudent: (req, res) => {
    console.log("CHAY DAY NE");
    var data = req.body;
    try {
      var bc = new blockchain(data.Address, data.PrivateKey);
      bc.getAll1sv(data.ArrayClass, data.Student_ID).then(function (re) {
        /*  if(data.Student_ID){
                    db.connect().then(function () {
                        var req = new sql.Request(db);
                        req.query(`Select Student.Student_ID, Student_Name, StudentClass.Class_ID, Class.Class_Name, Class.Class_Course  from Student , StudentClass, Class
                        where Student.Student_ID = StudentClass.Student_ID
                        and StudentClass.Class_ID = Class.Class_ID
                        and Student.Student_ID = '2221128422'`).then(function (result) {
                        console.log('RESULT ', result)
                          res.json(re)  
                        }) 
			db.close()    
                    })
                    .catch(function (err) {
                        res.json(err)
                    });
                }else{*/
        res.json(re);
        // }
      });
    } catch (err) {
      console.log(err);
    }
  },
  getStatus: (req, res) => {
    var data = req.body;
    try {
      var bc = new blockchain(data.Address, data.PrivateKey);
      bc.getStatus(data.Class).then(function (re) {
        res.json(re);
      });
    } catch (err) {
      console.log(err);
    }
  },
  acceptReq: (req, res) => {
    var data = req.body;
    //console.log(data)
    let a = Number(data.Decision);
    let b = Number(data.id);
    var test = {
      0: a,
      1: b,
      3: data.Class,
    };
    try {
      var bc = new blockchain(data.Address, data.PrivateKey);
      bc.acceptREQ(a, b, data.Class).then(function (re) {
        db.connect()
          .then(async function () {
            var req = new sql.Request(db);
            let getTransaction = new GetTransaction(re);
            const res1 = await getTransaction.Fee();
            req
              .query(
                `Update Wallet set Balance = ROUND(Balance - ${+res1}, 8) where WalletAddress = '${
                  data.Address
                }'`
              )
              .then(function (result) {
                res.json("OK");
                db.close();
              });
          })
          .catch(function (err) {
            res.json(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  },
  sendRequest: (req, res) => {
    var data = req.body;
    try {
      var bc = new blockchain(data.Address, data.PrivateKey);
      bc.sendRQ(data.id, data.Class).then(function (re) {
        db.connect()
          .then(async function () {
            var req = new sql.Request(db);
            let getTransaction = new GetTransaction(re);
            const res1 = await getTransaction.Fee();
            req
              .query(
                `Update Wallet set Balance = ROUND(Balance - ${+res1}, 8) where WalletAddress = '${
                  data.Address
                }'`
              )
              .then(function (result) {
                res.json("OK");
                db.close();
              });
          })
          .catch(function (err) {
            res.json(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  },
  getBalance: (req, res) => {
    var data = req.body;
    db.connect()
      .then(function () {
        var req = new sql.Request(db);
        //console.log(`select Balance from Wallet where WalletAddress = '${data.ListOfAddress.trim()}'`)
        req
          .query(
            `select Balance, Status from Wallet where WalletAddress = '${data.ListOfAddress.trim()}'`
          )
          .then(function (result) {
            // console.log(result)
            db.close();
            var bc = new blockchain(
              data.Address.trim(),
              data.PrivateKey.trim()
            );
            bc.getBalance(data.ListOfAddress.trim()).then(function (re) {
              //console.log("result ", result)
              const a = {
                realBalance: re,
                dbBalance:
                  result.recordset.length > 0 ? result.recordset[0].Balance : 0,
                status:
                  result.recordset.length > 0
                    ? result.recordset[0].Status
                    : null,
              };
              //console.log(a)
              res.json(a);
            });
          });
      })
      .catch(function (err) {
        res.json(err);
      });
  },
  getBalanceDb: (req, res) => {
    var data = req.body;
    var req = new sql.Request(db);

    console.log(data);
    db.connect().then(function () {
      req
        .query(
          `select Balance from Wallet where WalletAddress = '${data.ListOfAddress.trim()}'`
        )
        .then(function (result) {
          //console.log(result);
          res.json(result.recordsets.Balance);
        });
    });
  },

  sendEth: (req, res) => {
    var data = req.body;
    var req = new sql.Request(db);
    // console.log(data)
    try {
      var bc = new blockchain(data.Address.trim(), data.PrivateKey.trim());
      if (bc === undefined) {
        console.log("WTF");
      }
      bc.sendEther(data.to.trim(), +data.amount).then(function (re) {
        //console.log(re)
        db.connect()
          .then(async function () {
            var req = new sql.Request(db);
            let getTransaction = new GetTransaction(re);
            const res1 = await getTransaction.Fee();
            req
              .query(
                `Update Wallet set Balance = ROUND(Balance + ${+data.amount}, 8) where WalletAddress = '${
                  data.to
                }'`
              )
              .then(function (result) {
                res.json("OK");
                db.close();
              });
          })
          .catch(function (err) {
            res.json(err);
          });
      });
    } catch (err) {
      console.log(err);
      res.json(null);
    }
  },
  //get fee transaction
  getFeeTransaction: async (req, res) => {
    let data = req.body;
    //console.log(data)
    let getTransaction = new GetTransaction(data.transHash);
    try {
      const re = await getTransaction.Fee();
      res.json(re);
    } catch (err) {
      console.log(err);
    }
  },

  getStudentInfo: (req, res) => {
    let data = req.body;
    db.connect()
      .then(function () {
        var req = new sql.Request(db);
        req
          .query(
            `Select Student.Student_ID, Student_Name, StudentClass.Class_ID, Class.Class_Name, Class.Class_Course  from Student , StudentClass, Class
            where Student.Student_ID = StudentClass.Student_ID
            and StudentClass.Class_ID = Class.Class_ID
            and Student.Student_ID = '${data.Student_ID}'`
          )
          .then(function (result) {
           // console.log("RESULT ", result);
            db.close()
            res.json(result.recordset);
          });
      })
      .catch(function (err) {
        res.json(err);
      });
  },
};
