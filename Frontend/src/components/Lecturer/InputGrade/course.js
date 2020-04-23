import React, { Component } from "react";

import DetailCourse from "./detailCourse";
import ViewClassGrade from "./viewClassGrade";
//import Test from './detailCourse';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actionLecturerDetailCourse from "../../../actions/lecturerGetDetailCourse";
import * as actionShowDetailGrade from "../../../actions/studentIsShowDetailGrade";
import * as actionStudentClass from "../../../actions/lecturerGetStudentClass";

import * as actionLecturerHandleShow from "../../../actions/lecturerHandleShow";
import * as actionLecturerClassGrade from "../../../actions/lecturerClassGrade";
import Modal from "./../../Modal/transaction";

import Report from "./ChartReport";

import ReportText from "./Report";

const NAME_GRADE = [
  "(8.5-10) Excellent",
  "(7.0-8.4) Good",
  "(5.5-6.9) Average",
  "(4.0-5.4) Below Average",
  "(0-3.9) Weak",
];

let sum = [0, 0, 0, 0, 0];

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: null,
      ViewClassGrade: false,
      render: false,
      shouldShowReport: true,
      Name_Course: ''
    };
  }

  renderViewGrade = (course) => {
    const param = {
      Session_ID: course.Session_ID,
    };
    const {
      actionLecturerDetailCourseCreators,
      actionShowDetailGradeCreator,
      actionLecturerHandleShowCreator,
    } = this.props;
    const {
      actionGetLecturerDetailCourse,
    } = actionLecturerDetailCourseCreators;
    const { actionShowDetailGrade } = actionShowDetailGradeCreator;
    const { actionLecturerShow } = actionLecturerHandleShowCreator;

    /*let check = false;
		if(course.Session_IsUploadStudent === true)
			check = true;*/
    actionGetLecturerDetailCourse(param);
    actionShowDetailGrade();

    actionLecturerShow({
      Course: course,
      IsShow: false,
      ViewClassGrade: false,
      IsUploadStudent: course.Session_IsUploadStudent,
      IsUploadOutline: course.Session_IsUploadOutline,
      isShowReport: false,

      //"finishUpload" : check
    });

    this.setState({
      course: course,
      ViewClassGrade: false,
    });
  };
  ViewGrade = (course) => {
    const {
      actionLecturerClassGradeCreators,
      actionLecturerHandleShowCreator,
    } = this.props;

    const { actionLecturerShow } = actionLecturerHandleShowCreator;
    const { actionGetLecturerClassGrade } = actionLecturerClassGradeCreators;

    actionLecturerShow({
      ViewClassGrade: true,
      Course: course,
      isShowReport: false,
    });

    actionGetLecturerClassGrade({
      DetailCourse: {
        Session_ID: course.Session_ID,
      },
      StudentClass: {
        Session_ID: course.Session_ID,
      },
      GetClassGradeBC: {
        //Address : '0x06fB399b9245cb14693Ea430323f2e6b15336E1b',
        //PrivateKey : 'E2B5B2798E30B3302D3F4668492112DF83A7997CC29BAC06F338ECBBB5AFDF31',
        Address: "0x3F51Fb174e5fC0e3B75d2040Dd97EE82290f2b1c",
        PrivateKey:
          "8BC5DD862E7B6702E20294E636EF0DE11B73523653E405C7F61F4587ED1E15F7",
        Class: this.ignoreSpaces(
          `${this.props.titleDropdown.Year}-${this.props.titleDropdown.Session}-${this.props.lecturerHandleShow.Course.Session_ID}-${this.props.lecturerHandleShow.Course.Course_ID}`
        ),
      },
    });

    //console.log(this.ignoreSpaces(`${this.props.titleDropdown.Year}-${this.props.titleDropdown.Session}-${this.props.lecturerHandleShow.Course.Session_ID}-${this.props.lecturerHandleShow.Course.Course_ID}`))
    this.setState({
      ViewClassGrade: true,
    });
  };
  ignoreSpaces(string) {
    var temp = "";
    string = "" + string;
    let splitstring = string.split(" ");
    for (let i = 0; i < splitstring.length; i++) temp += splitstring[i];
    return temp;
  }

  Report = async (course) => {
    const {
      actionLecturerClassGradeCreators,
      actionLecturerHandleShowCreator,
    } = this.props;

    const { actionLecturerShow } = actionLecturerHandleShowCreator;
    const { actionGetLecturerClassGrade } = actionLecturerClassGradeCreators;

    actionLecturerShow({
      ViewClassGrade: false,
      Course: course,
      ViewClassGrade: false,
      isShowReport: true,
    });

    await actionGetLecturerClassGrade({
      DetailCourse: {
        Session_ID: course.Session_ID,
      },
      StudentClass: {
        Session_ID: course.Session_ID,
      },
      GetClassGradeBC: {
        //Address : '0x06fB399b9245cb14693Ea430323f2e6b15336E1b',
        //PrivateKey : 'E2B5B2798E30B3302D3F4668492112DF83A7997CC29BAC06F338ECBBB5AFDF31',
        Address: "0xB4E2c4a0b461Fdf68D7FC72889eb77f7dFA13966",
        PrivateKey:
          "2052277B5DFD8481FBFCA90DA1982C8E81E14670721767EE736BAF41351B8BDD",
        Class: this.ignoreSpaces(
          `${this.props.titleDropdown.Year}-${this.props.titleDropdown.Session}-${this.props.lecturerHandleShow.Course.Session_ID}-${this.props.lecturerHandleShow.Course.Course_ID}`
        ),
      },
    });

    /*actionLecturerShow({
			"ViewClassGrade" : true,
			"Course" : course,
		})*/

    //console.log(this.props)

    this.setState({
      render: !this.state.render,
      Name_Course : course.Course_Name
    });
  };

  renderCourse = (courses) => {
    let xhtml = null;
    if (courses.length > 0) {
      xhtml = courses.map((course, index) => {
        return (
          <tr key={index}>
            <td className="record">{course.Course_ID}</td>
            <td className="record">{course.Course_Name}</td>
            <td className="record">{course.Session_Type}</td>
            <td className="btn-view record">
              <button
                onClick={() => this.renderViewGrade(course)}
                type="button"
                className="btn btn-default"
              >
                <i className="glyphicon glyphicon-pencil"></i>&nbsp; Input Grade
              </button>
              <button
                onClick={() => this.ViewGrade(course)}
                type="button"
                className="btn btn-default"
              >
                <i className="glyphicon glyphicon-search"></i>&nbsp; View
                Grade&nbsp;
              </button>
              <button
                onClick={() => this.Report(course)}
                type="button"
                className="btn btn-default"
              >
                <i className="glyphicon glyphicon-signal"></i>&nbsp;
                Report&nbsp;
              </button>
            </td>
          </tr>
        );
      });
    }
    return xhtml;
  };

  grade = (grade, student, course) => {
    try {
      sum = [0, 0, 0, 0, 0];

      let numberOutline = 0;
      grade &&
        grade.percent.forEach((i) => {
          if (i !== "") numberOutline += 1;
        });
      let numberStudent = student.length;
      let gradeAsStudent = [];
      for (let i = 0; i < numberStudent; i++) gradeAsStudent[i] = 0;
      let bangdiem = grade && grade.bangdiem;
      for (let i = 0; i < numberOutline; i++) {
        for (let j = 0; j < numberStudent; j++) {
          gradeAsStudent[j] +=
            bangdiem[i][j] === "" || bangdiem[i][j] === undefined
              ? 0
              : +bangdiem[i][j];
        }
      }

      let flag = false;
      let temp = 0;
      let haha = 0;
      for (let arr of bangdiem) {
        temp = 0;
        haha++;
        for (let diem of arr) {
          if (diem === "") temp++;
        }
        if (temp === numberStudent) flag = true;

        if (haha === numberOutline) break;
      }

      if(bangdiem[0].length ===0) flag = true;

      if (flag === true) {
        return false;
      } else {
        return {
          gradeAsStudent,
          student,
          numberOutline,
        };
      }
    } catch (err) {
      return false;
    }
  };

  getGrade = (grade, student, course) => {
    //render data for chart
    //	console.log(grade, student, course);
    try {
      let numberOutline = 0;

      grade.percent.forEach((i) => {
        if (i !== "") numberOutline += 1;
      });

      let numberStudent = student.length;

      let gradeAsStudent = [];
      for (let i = 0; i < numberStudent; i++) gradeAsStudent[i] = 0;

      // console.log(gradeAsStudent);

      let bangdiem = grade.bangdiem;
      /*let bangdiem = [
		[3.9, 4.5, 6,7.5,9]
	]*/

      for (let i = 0; i < numberOutline; i++) {
        for (let j = 0; j < numberStudent; j++) {
          //console.log(bangdiem[i][j])
          gradeAsStudent[j] +=
            bangdiem[i][j] === "" || bangdiem[i][j] === undefined
              ? 0
              : +bangdiem[i][j];
        }
      }

      let flag = false;

      //console.log('vc' , gradeAsStudent)

      //kiem tra xem mon hoc da co tat cac cac diem chua
      let temp = 0;
      let haha = 0;
      //console.log('vc', gradeAsStudent)
      for (let arr of bangdiem) {
        temp = 0;
        haha++;
        for (let diem of arr) {
          if (diem === "") temp++;
        }
        // console.log(temp, numberOutline)
        if (temp === numberStudent) flag = true;

        if (haha === numberOutline) break;
      }

      if(bangdiem[0].length ===0) flag = true;
      /*for (let i = 0; i < gradeAsStudent.length; i++) {
      if (gradeAsStudent[i] === 0) {
        //chua co tat ca cac cot diem
        flag = true;
      }
    }*/
      //console.log(flag)
      //console.log(gradeAsStudent);

      if (flag === true) {
        return false;
      } else {
        //phan loai
        let result = [];
        for (let i = 0; i < NAME_GRADE.length; i++) {
          result.push({
            name: NAME_GRADE[i],
            All: 0,
            Male: 0,
            Female: 0,
          });
        }

        //console.log(result);

        for (let i = 0; i < gradeAsStudent.length; i++) {
          let g = gradeAsStudent[i] / numberOutline;
          let n = this.createGrade(g);
          //console.log(gradeAsStudent[i], g, n);
          result[n].All += 1 / numberStudent;
          if (student[i].Sex === true) result[n].Male += 1 / numberStudent;
          else result[n].Female += 1 / numberStudent;

          //console.log(result[n])
        }

        //tinh tong so nu
        //tinh tong so nam
        let male = 0;
        let female = 0;
        for (let i = 0; i < student.length; i++) {
          if (student[i].Sex === true) male += 1;
          else female += 1;
        }

        //console.log(male, female, numberStudent)

        // console.log('Before ', result);
        let a = 0;
        let b = 0;
        let c = 0;
        for (let i = 0; i < result.length; i++) {
          if (i === 5 - 1) {
            result[i].All = 100 - a;
            result[i].Male = Math.round((male / numberStudent) * 100) - b;
            result[i].Female = Math.round((female / numberStudent) * 100) - c;
          } else {
            a += Math.round(result[i].All * 100);
            b += Math.round(result[i].Male * 100);
            c += Math.round(result[i].Female * 100);
            result[i].All = Math.round(result[i].All * 100);
            result[i].Male = Math.round(result[i].Male * 100);
            result[i].Female = Math.round(result[i].Female * 100);
          }
        }
        result = result.reverse();
        result.push({
          name: "Total",
          All: 100,
          Male: Math.round((male / numberStudent) * 100),
          Female: Math.round((female / numberStudent) * 100),
        });

        //console.log("After ", result);

        return result;
      }
    } catch (err) {
      return false;
    }
  };

  createGrade = (grade) => {
    //console.log(grade, typeof grade);
    //console.log(grade);
    if (grade >= 8.5) {
      sum[0] += 1;
      return 0;
    } else if (grade < 8.5 && grade >= 7.0) {
      sum[1] += 1;
      return 1;
    } else if (grade >= 5.5 && grade < 7.0) {
      sum[2] += 1;
      return 2;
    } else if (grade >= 4.0 && grade < 5.5) {
      sum[3] += 1;
      return 3;
    } else {
      sum[4] += 1;
      return 4;
    }
  };
  render() {
    return (
      <div>
        <div className="panel panel-danger panel-course">
          <div className="panel-body">
            {this.props.titleDropdown.titleDropdown ===
            "-- Select school year and semester --" ? (
              <p id="test02">Choose school year and semester above...</p>
            ) : this.props.course.length === 0 ? (
              <b>No Class</b>
            ) : (
              <table className="table table-bordered table-hover table-chinh">
                <thead className="table-title">
                  <tr>
                    <th>Class</th>
                    <th>Course Name</th>
                    <th>Type</th>
                    <th>View Grade</th>
                  </tr>
                </thead>
                <tbody>{this.renderCourse(this.props.course)}</tbody>
              </table>
            )}
          </div>
        </div>
        <Modal />
        {this.props.lecturerHandleShow.isShowReport &&
        this.props.grade !== "" ? (
          <div>
            <ReportText
              data={this.grade(
                this.props.grade,
                this.props.student,
                this.props.courseI
              )}
              course={this.state.Name_Course}
            />

            <Report
              data={this.getGrade(
                this.props.grade,
                this.props.student,
                this.props.courseI
              )}
              sumary={sum}
              n={this.props.student.length}
            />
          </div>
        ) : this.props.lecturerHandleShow.ViewClassGrade === true ? (
          <ViewClassGrade />
        ) : (
          <DetailCourse />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    lecturerDetailCourse: state.lecturerDetailCourse,
    course: state.lecturerCourse,
    titleDropdown: state.titleDropdown,
    lecturerHandleShow: state.lecturerHandleShow,
    showDetailGrade: state.studentIsShowDetailGrade,
    //course : state.lecturerCourse,
    studentClass: state.lecturerStudentClass,
    //nam hoc  hoc ky
    outline: state.lecturerDetailCourse,
    lecturerUploadGrade: state.lecturerUploadGrade,
    grade: state.lecturerClassGrade,
    student: state.lecturerStudentClass,
    courseI: state.lecturerHandleShow.Course,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actionLecturerDetailCourseCreators: bindActionCreators(
      actionLecturerDetailCourse,
      dispatch
    ),
    actionShowDetailGradeCreator: bindActionCreators(
      actionShowDetailGrade,
      dispatch
    ),
    actionGetStudentClassCreator: bindActionCreators(
      actionStudentClass,
      dispatch
    ),
    actionLecturerHandleShowCreator: bindActionCreators(
      actionLecturerHandleShow,
      dispatch
    ),
    actionLecturerClassGradeCreators: bindActionCreators(
      actionLecturerClassGrade,
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Course);
