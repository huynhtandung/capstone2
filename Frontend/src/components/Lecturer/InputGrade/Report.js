import React, { Component } from "react";

import {getReport} from '../../../apis/Report/index'

let sum = [0, 0, 0, 0, 0];

let html = null;

class ReportText extends Component {
  renderGrade = (gradeAsStudent, student, numberOutline) => {
    let numStudent = student.length;
    sum = [0, 0, 0, 0, 0];

    for (let i = 0; i < gradeAsStudent.length; i++) {
      gradeAsStudent[i] =
        Math.round((gradeAsStudent[i] / numberOutline) * 100) / 100;
    }

    gradeAsStudent = gradeAsStudent.sort((a, b) => b - a);

    let xhtml = null;

    xhtml = gradeAsStudent.map((grade, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{student[index].JS_Student_ID}</td>
          <td>{student[index].Student_Name}</td>
          <td>{grade}</td>
          <td>{this.createGrade(grade)}</td>
        </tr>
      );
    });

    /*xhtml.push(
        <tr key={-1}>
            <td colSpan={5}>
                <span style={css}>Excellent:</span> {sum[0]}({Math.round(sum[0] / numStudent * 100)}%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={css}>Good:</span> {sum[1]}({Math.round(sum[1] / numStudent * 100)}%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={css}>Average:</span> {sum[2]}({Math.round(sum[2] / numStudent * 100)}%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={css}>Below Average:</span> {sum[3]}({Math.round(sum[3] / numStudent * 100)}%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={css}>Weak:</span> {sum[4]}({Math.round(sum[4] / numStudent * 100)}%)
            </td>
        </tr>
    )*/
    /*xhtml.push(
      <tr key={-1}>
        <td style={{ textAlign: "right" }} colSpan={5}>
          <label className="switch">
            <input className="chk"
              type="checkbox"
              onClick={this.onClick}
            />
            <span className="slider round"></span>
          </label>&nbsp; &nbsp;View in group
        </td>
      </tr>
    );*/
    return xhtml;
  };

  onClick = (grade, student, numberOutline) => {
    const e = document.querySelector(".chk");
    const body = document.querySelector(".body_");
    //const table = document.querySelector('.tb_report')
    if (e.checked === true) {
      html = body.innerHTML;

      let xml = "";
      let i = 0;

      //excellent
      xml +=
        "<tr><td style='text-align:center' colSpan='5'>Excellent</td></tr>";
      grade.map((g, index) => {
        if (this.createGrade(g) === "Excellent") {
          i++;
          xml += `<tr>
            <td>${i}</td>
            <td>${student[index].JS_Student_ID}</td>
            <td>${student[index].Student_Name}</td>
            <td>${grade[index]}</td>
            <td>${this.createGrade(g)}</td>
          </tr>`;
        }
      });

      //GOod
      i = 0;
      xml += "<tr><td style='text-align:center' colSpan='5'>Good</td></tr>";
      grade.map((g, index) => {
        if (this.createGrade(g) === "Good") {
          i++;
          xml += `<tr>
            <td>${i}</td>
            <td>${student[index].JS_Student_ID}</td>
            <td>${student[index].Student_Name}</td>
            <td>${grade[index]}</td>
            <td>${this.createGrade(g)}</td>
          </tr>`;
        }
      });

      //Average
      i = 0;
      xml += "<tr><td style='text-align:center' colSpan='5'>Average</td></tr>";
      grade.map((g, index) => {
        if (this.createGrade(g) === "Average") {
          i++;
          xml += `<tr>
            <td>${i}</td>
            <td>${student[index].JS_Student_ID}</td>
            <td>${student[index].Student_Name}</td>
            <td>${grade[index]}</td>
            <td>${this.createGrade(g)}</td>
          </tr>`;
        }
      });

      //Below average
      i = 0;
      xml +=
        "<tr><td style='text-align:center' colSpan='5'>Below Average</td></tr>";
      grade.map((g, index) => {
        if (this.createGrade(g) === "Below average") {
          i++;
          xml += `<tr>
            <td>${i}</td>
            <td>${student[index].JS_Student_ID}</td>
            <td>${student[index].Student_Name}</td>
            <td>${grade[index]}</td>
            <td>${this.createGrade(g)}</td>
          </tr>`;
        }
      });

      //Weak
      i = 0;
      xml += "<tr><td style='text-align:center' colSpan='5'>Weak</td></tr>";
      grade.map((g, index) => {
        if (this.createGrade(g) === "Weak") {
          i++;
          xml += `<tr>
            <td>${i}</td>
            <td>${student[index].JS_Student_ID}</td>
            <td>${student[index].Student_Name}</td>
            <td>${grade[index]}</td>
            <td>${this.createGrade(g)}</td>
          </tr>`;
        }
      });

      body.innerHTML = xml;
    } else {
      //console.log(html)
      body.innerHTML = html;
    }
  };

  createGrade = (grade) => {
    //console.log(grade, typeof grade);
    //console.log(grade);
    if (grade >= 8.5) {
      sum[0] += 1;
      return "Excellent";
    } else if (grade < 8.5 && grade >= 7.0) {
      sum[1] += 1;
      return "Good";
    } else if (grade >= 5.5 && grade < 7.0) {
      sum[2] += 1;
      return "Average";
    } else if (grade >= 4.0 && grade < 5.5) {
      sum[3] += 1;
      return "Below average";
    } else {
      sum[4] += 1;
      return "Weak";
    }
  };

  download = (grade, student, n) => {
    let a = JSON.stringify(grade)
    console.log(a, JSON.parse(a))
    console.log('vc')
    getReport({
      grade, student, n
    }).then(res=>{
     // console.log(res)
    })
  }

  render() {
    let { gradeAsStudent, student, numberOutline } = this.props.data;
    return this.props.data !== false ? (
      <div className="report-text" style={{ display: "block" }}>
        <div className="panel panel-danger" style={{ borderColor: "white" }}>
          <div className="panel-heading" style={{}}>
            <h3 style={{fontSize:"25px"}} className="panel-title">
              {this.props.course}
            </h3>
          </div>
          <div className="panel-body">
            <div className="sth">
              <div className="changeView" style={{float:"right"}}>
                <label className="switch" title="Change View">
                  <input
                    className="chk"
                    type="checkbox"
                    onClick={() =>
                      this.onClick(gradeAsStudent, student, numberOutline)
                    }
                  />
                  <span className="slider round" ></span>
                </label>
               {/* <span style={{lineHeight:"100%"}}>Change View</span> */}
              </div>
              <div className="down" style={{float:"right", marginTop:"-2px", marginRight:"12px"}}>
          
                <a className="btn btn-default" href={`http://127.0.0.1:8088/report/${JSON.stringify(gradeAsStudent)}/${JSON.stringify(student)}/${numberOutline}`} role="button">
                Export Excel</a>
              </div>
            </div>
            <table
              className="table table-bordered table-hover tb_report"
              style={{ border: "none" }}
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Average Grade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="body_">
                {this.renderGrade(gradeAsStudent, student, numberOutline)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default ReportText;
