"use strict";

const util = require("util");
var sql = require("mssql");
const db = require("../db");
let fs = require("fs");
let nodeXlsx = require("node-xlsx");

module.exports = {
  exportExcelStudentList: (req, res) => {
    var dt = req.body;
    var id = req.params.sesionID;
    db.connect()
      .then(function () {
        var req = new sql.Request(db);
        req
          .query(
            `Select JoinSession.JS_Student_ID, Student.Student_Name from JoinSession, Student 
			where JoinSession.JS_Student_ID = Student.Student_ID and
		  	JoinSession.JS_Session_ID = ${id} `
          )
          .then(function (result) {
            //console.log(result.recordset)
            if (result.recordset.length !== 0) {
              let dataExcel = [];
              let arrHeaderTitle = ["Student ID", "Student Name", "Grade"];
              dataExcel.push(arrHeaderTitle); // push header vao mang dataExcel

              for (let item of result.recordset.sort()) {
                let rowItemValue = [];
                rowItemValue.push(item.JS_Student_ID);
                rowItemValue.push(item.Student_Name);
                rowItemValue.push("");
                dataExcel.push(rowItemValue); // push tung dong value vao mang dataExcel
              }
              console.log(dataExcel);
              let buffer = nodeXlsx.build([
                { name: "List Student", data: dataExcel },
              ]); // Returns a buffer
              res.attachment("students.xlsx");
              res.send(buffer);

              db.close();
            } else {
              res.json();
              db.close();
            }
          });
      })
      .catch(function (err) {
        res.json(err);
      });
  },

  exportReport: (req, res) => {

    let {grade, student, n} = req.params;
   // console.log(JSON.parse(grade), JSON.parse(student))
    
    grade = JSON.parse(grade)
    student = JSON.parse(student)

    let dataExcel = [];

    let arrHeaderTitle = ["No", "Student ID", "Student Name", "Grade"];
    dataExcel.push(arrHeaderTitle);

    for (let i = 0; i < grade.length; i++) {
      let rowItemValue = [];
      rowItemValue.push(i);
      rowItemValue.push(student[i].JS_Student_ID);
      rowItemValue.push(student[i].Student_Name);
      rowItemValue.push(Math.round(grade[i] / n *100) /100);
      dataExcel.push(rowItemValue); // push tung dong value vao mang dataExcel
    }

    console.log(dataExcel);
    let buffer = nodeXlsx.build([{ name: "Report", data: dataExcel }]); // Returns a buffer
    res.attachment("report.xlsx");
    res.send(buffer)


   res.sendFile(buffer)


    //res.send(buffer)*/
  },
};
