import React, { Component } from 'react'
import './styles.css'
import { connect } from 'react-redux'
import * as actionGetStudent from '../../actions/lecturerGetStudentClass';
import { bindActionCreators } from 'redux';
import * as actionLecturerHandleShow from '../../actions/lecturerHandleShow'

var CryptoJS = require('crypto-js')
class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mark: true
        }
    }
    

    renderDateTime = (datetimes) => {
        let xhtml = null;
        if (datetimes.length > 0) {
            xhtml = datetimes.map((record, index) => {
                return (
                    <th key={index}>
                        {record.DateTime}
                    </th>
                )
            })
        }
        return xhtml;
    }
    
    renderGrade = (students, grades) => {
        let xhtml = null;
        if (students.length > 0 && grades.length > 0) {
            //localStorage.setItem("mark", grades)
            xhtml = students.map((student, index) => {
                return (
                    <tr key={index} className={CryptoJS.AES.decrypt(sessionStorage.getItem('id').toString(), 'huynhtandung-dev').toString(CryptoJS.enc.Utf8) === student.JS_Student_ID ? "active" : ""}>
                        <td>{student.JS_Student_ID}</td>
                        <td>{student.Student_Name}</td>
                        {
                            grades.map((grade, i) => {
                                return (
                                    <td key={i * -1}>
                                        {grade.Grade[index]}
                                    </td>
                                )
                            })
                        }
                    </tr>
                )
            })
        }
        return xhtml;

    }

    render() {
        return (
            <div>


                <div className="modal fade zIndex" id="myModalTransaction" role="dialog">
                    {this.props.ViewHistoryGrade
                        ? <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">History Grade</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Student ID</th>
                                                    <th>Student Name</th>
                                                    {this.renderDateTime(this.props.transaction)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderGrade(this.props.studentClass, this.props.transaction)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div> : ""}


                </div>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        studentClass: state.lecturerStudentClass,
        transaction: state.transaction,
        ViewHistoryGrade: state.lecturerHandleShow.ViewHistoryGrade
    };
};
const mapDispatchToProps = dispatch => {
    return {
        actionGetStudentCreator: bindActionCreators(actionGetStudent, dispatch),
        actionLecturerHandleShowC : bindActionCreators(actionLecturerHandleShow, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
