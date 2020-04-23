import React, { Component } from "react";
import { connect } from "react-redux";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";


const css = {
  color : "red"
}

const data = [
  {
    name: "(8.5-10) Excellent",
    All: 3,
    Male: 1,
    Female: 2,
  },
  {
    name: "(7.0-8.4) Good",
    All: 6,
    Male: 3,
    Female: 3,
  },
  {
    name: "(5.5-6.9) Average",
    All: 12,
    Male: 5,
    Female: 7,
  },
  {
    name: "(4.0-5.4) Below Average",
    All: 26,
    Male: 15,
    Female: 11,
  },
  {
    name: "(0-3.9) Weak",
    All: 3,
    Male: 2,
    Female: 1,
  },
  {
    name: "Total",
    All: 100,
    Male: 46,
    Female: 24,
  },
];

class Report extends Component {
  /*componentDidMount(){
        const {grade, student, course} = this.props;
        
        let numberOutline = 0;
        grade.percent.forEach(e => {
            if(e !== "") numberOutline += 1
        })
        
        console.log(numberOutline)
        console.log('Run')
    }*/
  render() {
    return this.props.data === false ? (
      <div
        style={{
          color: "white",
          fontSize: "20px",
          textAlign: "center",
          backgroundColor: "#1677af",
        }}
      >
        Can not make the report for this course
      </div>
    ) : (
      <div
        className="haha"
        style={{ backgroundColor: "white", height: "270px" }}
      >
        <div
          className="col-xs-10 col-sm-10 col-md-10 col-lg-10"
          style={{ padding: "0px" }}
        >
          <div className="report" style={{ backgroundColor: "white" }}>
            <div className="report-content" style={{}}>
              <BarChart width={930} height={250} data={this.props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="All" fill="#8884d8" />
                <Bar dataKey="Male" fill="#82ca9d" />
                <Bar dataKey="Female" fill="#3289a8" />
              </BarChart>
            </div>
          </div>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{paddingLeft:"0px"}}>
          <div className="thumbnail sumary" style={{height:"200px"}}>
            <p>Sumary</p>
            <ul style={{paddingLeft:"20px"}}>
              <li><span style={css}>Excellent: </span>{this.props.sumary[0]}({Math.round(this.props.sumary[0] / this.props.n * 100)}%)</li>
              <li><span style={css}>Good: </span>{this.props.sumary[1]}({Math.round(this.props.sumary[1] / this.props.n * 100)}%)</li>
              <li><span style={css}>Average: </span>{this.props.sumary[2]}({Math.round(this.props.sumary[2] / this.props.n * 100)}%)</li>
              <li><span style={css}>Below Average: </span>{this.props.sumary[3]}({Math.round(this.props.sumary[3] / this.props.n * 100)}%)</li>
              <li><span style={css}>Weak: </span>{this.props.sumary[4]}({Math.round(this.props.sumary[4] / this.props.n * 100)}%)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    /*  grade: state.lecturerClassGrade,
    student: state.lecturerStudentClass,
    course : state.lecturerHandleShow.Course,*/
  };
};

export default connect(mapStateToProps, null)(Report);
