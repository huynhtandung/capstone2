import React, { Component } from 'react'
import './styles.css'
import {connect} from 'react-redux'
import * as actionGetStudent from '../../actions/lecturerGetStudentClass';
import {bindActionCreators} from 'redux';

class Modal extends Component {
    renderGrade = (student, data) =>{
        let xhtml = null;
        let oldGrade;
        let newGrade;
        if(data !== undefined){
           //console.log("DAY: ", data.OldGrade)
            if(data.OldGrade !== null && data.OldGrade !== undefined){
                console.log("Chay vo day r")
                oldGrade = data.OldGrade.split('-')
                newGrade = data.Grade.split('-')
                //console.log("OLD GRADE: ", oldGrade)
                if(student.length > 0){
                    xhtml = student.map((record, index)=>{
                        return(
                            <tr key={index}>
                                <td>{record.JS_Student_ID}</td>
                                <td>{record.Student_Name}</td>
                                <td>{oldGrade[index]}</td>
                                <td>{newGrade[index]}</td>
                            </tr>
                        )
                    })
                }
            }
            //console.log("OLD-NEW: ", oldGrade, newGrade)
            //console.log("Old Grade: ", oldGrade)
            
            
        }
        
        return xhtml;
       
    }
    render() {
        return (
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">{this.props.data.OutLine_Name} - {this.props.data.Course_Name}</h4>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Student Name</th>
                                        <th>Original Grade</th>
                                        <th>Request Makup Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderGrade(this.props.studentClass, this.props.data)}
                                </tbody>
                            </table>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
	return {
		studentClass : state.lecturerStudentClass
	};
};
const mapDispatchToProps = dispatch => {
	return {
		actionGetStudentCreator : bindActionCreators(actionGetStudent, dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
