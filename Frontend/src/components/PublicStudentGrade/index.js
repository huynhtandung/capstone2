import React, { Component } from 'react'
import StudentTranscript from '../Student/Transcript'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionGetAllGrade from '../../actions/studentGetAllGrade';
import Modal from './ModalPublic.js'

class PublicStudentGrade extends Component {

    constructor(props){
		super(props);
		this.state = {
			id : ''
		}
	}

    onCheckGrade = (e) => {
        e.preventDefault();
        let id = document.querySelector('#idStudent')
        id = id && id.value;
        this.setState({
            id : id
        })

        //call api
        const {actionGetAllGradeCreators} = this.props;
		const {actionStudentGetAllGrade} = actionGetAllGradeCreators;
		actionStudentGetAllGrade({
			//Student_ID : sessionStorage.getItem('id'),
			"Student_ID" : id,
			Address : '0x06fB399b9245cb14693Ea430323f2e6b15336E1b',
			PrivateKey : 'E2B5B2798E30B3302D3F4668492112DF83A7997CC29BAC06F338ECBBB5AFDF31',
		})
    }

    render() {
        //console.log('render', this.props.studentGetAllGrade)
        return (
            <div className='container'>
                <div className="col-xs-0 col-sm-1 col-md-2 col-lg-3"></div>
                <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6">
                    <div className="panel panel-primary panel-login">
                        <div className="panel-heading">
                            <h3 className="panel-title">Check the student grade</h3>
                        </div>
                        <div className="panel-body body_pn">
                            <form onSubmit={this.onCheckGrade} className="form-horizontal" >
                                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                    <div className="form-group"> 
                                        <input pattern="[A-Za-z0-9]+" title="Not contain special characters" onChange={this.onChange} type="text" id="idStudent" className="form-control" required="required" placeholder='Student ID' /> 
                                    </div>
                                    <div className="form-group" style={{textAlign: "center"}}>
                                        <button type="submit" className="btn btn-danger btn-login" data-toggle="modal" data-target="#myModal">Submit</button>
                                        <a style={{paddingTop: "10px", display: "block"}} href="/login">Login into the system?</a>
                                    </div>
                                </div>
                                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                            </form>
                        </div>
                    </div>
                </div>
                { /* margin right */}
                <div className="col-xs-0 col-sm-1 col-md-2 col-lg-3 btn-login"></div>
                <Modal grade={this.props.studentGetAllGrade} class={this.props.studentGetAllClass} id={this.state.id}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
		studentGetAllGrade : state.studentGetAllGrade,
		studentGetAllClass : state.studentGetAllClass,
		studentSchoolYear : state.studentSchoolYear
    };
};
const mapDispatchToProps = dispatch => {
    return{
		actionGetAllGradeCreators : bindActionCreators(actionGetAllGrade, dispatch)
    };
};  

export default connect(mapStateToProps, mapDispatchToProps)(PublicStudentGrade)
