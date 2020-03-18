import React, { Component } from 'react'
import './css/content.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionGetDepartment from '../../actions/Admin/department'
import * as actionGetWalletAddress from '../../actions/Admin/walletAddress'

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderAgain : false,
            title : 'Choose the Department'
        }
    }

    getWalletAddress = (data, type) =>{
        this.setState({
            title : type === 'AAD' ? 'Academic Affrais Department' : type==='DEAN' ? "Dean" :  data.Dep_Name
        })
        const {actionGetWalletAddressC} = this.props;
        const {actionGetWalletAddress} = actionGetWalletAddressC;
        actionGetWalletAddress({
            Type : type,
            Dep_ID : data ? data.Dep_ID : ""
        })
    }

    renderDepartment = (departments) =>{
        //console.log(departments)
        let xhtml = null;
        if(departments !== undefined){
            xhtml = departments.map((dep, index)=>{
                return(
                    <li key={index}>
                        <button onClick={()=>this.getWalletAddress(dep, 'LEC')} type="button" className="btn btn-info dep">{dep.Dep_Name}</button>
                    </li>
                )
            })
            xhtml.push(
                <li key={-11}>
                    <button onClick={()=>this.getWalletAddress(null, 'DEAN')} type="button" className="btn btn-info dep">Dean</button>
                </li>
            )
            xhtml.push(
                <li key={-1}>
                    <button onClick={()=>this.getWalletAddress(null, 'AAD')} type="button" className="btn btn-info dep">Academic Affrais Department</button>
                </li>
            )
        }
        return xhtml;
    }
    render() {
        //console.log('render')
        return (
            <div className="admin_content">
                <ol className="breadcrumb">
                    <li>
                        <p>Admin</p>
                    </li>
                    <li className="">Send Ethereum</li>
                </ol>
                {/*Hien thi danh sach cac khoa */}
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {this.state.title} &nbsp;
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        {this.renderDepartment(this.props.departments)}
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
	return {
        departments : state.departmentForAdmin,
        address : state.walletAddress
	};
};
const mapDispatchToProps = dispatch => {
    return{
        actionGetDepartmentC : bindActionCreators(actionGetDepartment, dispatch),
        actionGetWalletAddressC : bindActionCreators(actionGetWalletAddress, dispatch)
    };
};
export default  connect(mapStateToProps, mapDispatchToProps)(Content)