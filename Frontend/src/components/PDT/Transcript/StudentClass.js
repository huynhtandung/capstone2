import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionDeanStudentCourse from '../../../actions/DeanViewTranscript/deanStudentCourse'
import Transcript from './Transcript';
import * as actionHandleShow from '../../../actions/PDTTranscript/pdtHandleShow';
import './dean.css'



class StudentClass extends Component {
    constructor(props){
		super(props);
		this.state = {
			renderAgain : false
		}
	}
    renderAllStudent = (students) =>{
        let xhtml = null;
        if(students.length > 0){
            xhtml = students.map((student, index)=>{
                return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{student.Student_ID}</td>
                        <td>{student.Student_Name}</td>
                        <td>   
                            <button onClick={()=>this.renderTranscript(student)} type="button" className="btn btn-success">View</button> 
                        </td>
                    </tr>
                )
            })
        }
        if(xhtml === null){
            xhtml = (
                <tr key={-1}>
                    <td colSpan="4">No Student</td>
                </tr>
            )
        }
        return xhtml;
    }

    renderTranscript = data => {
		const {actionDeanStudentCourseCreators}  =this.props;
		const {actionGetStudentDeanCourse} = actionDeanStudentCourseCreators;
		actionGetStudentDeanCourse({
			Address : '0x06fB399b9245cb14693Ea430323f2e6b15336E1b',
			PrivateKey : 'E2B5B2798E30B3302D3F4668492112DF83A7997CC29BAC06F338ECBBB5AFDF31',
			Student_ID : data.Student_ID
		})
		
		
        
        const {actionHandleShowCreators} = this.props;
		const {actionPDTHandleShow} = actionHandleShowCreators;
		actionPDTHandleShow({
            showTranscript : true,
            titleTranscript : data.Student_ID + " - "+ data.Student_Name
        })

        this.setState({
			renderAgain : !this.state.renderAgain
		})
        
	}
    render() {
        return (
            <div className="">
                <div className="panel panel-default container dean__">
                    <div className="panel-heading">
                        K{this.props.pdtHandleShow.Course} - {this.props.pdtHandleShow.titleClass} - {this.props.pdtHandleShow.Department}
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Transcript</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderAllStudent(this.props.listStudent)}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.props.pdtHandleShow.showTranscript === true ?
                    <Transcript />
                    : ""
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        pdtHandleShow : state.pdtTranscriptHandleShow,
		listStudent : state.deanStudentClass
    };
};
const mapDispatchToProps = dispatch => {
    return{
        actionDeanStudentCourseCreators : bindActionCreators(actionDeanStudentCourse, dispatch),
        actionHandleShowCreators : bindActionCreators(actionHandleShow, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentClass);
