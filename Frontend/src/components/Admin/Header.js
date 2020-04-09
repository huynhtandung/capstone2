import React, { Component } from 'react';
import './css/header.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionGetBalance from '../../actions/Admin/balance'
//import './admin.css';

class Header extends Component {

    componentDidMount(){
        const {actionGetBalanceC} = this.props;
        const {actionGetBalance} = actionGetBalanceC;
        actionGetBalance({
            Address : '0x6DeFAd2d9841203B9C7062c143FEd7295d065aaE',
            PrivateKey: '2c950eba9f6ddbc30db5d607f8db31b4aed7fa12fa9f74b8997cb09fb9af609e',                                 
            ListOfAddress : sessionStorage.getItem('address').trim()
        })
    }

    render() {
        return (
            <div className="header ol"> 
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 title">
                    BGRADE
                </div>
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <p>ADMIN</p>
                    <p>
                        <span>Wallet Address: </span>
                        <span className='colorBright'>{sessionStorage.getItem('address')}</span>
                    </p>
                    <p>
                        <span>Balance: </span>
                        <span className='colorBright'>{Math.round(this.props.balance * 100) / 100} eth</span>
                    </p>
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 containerLogout">  
                    <a className="linkLogout" href='/admin/logout'>Logout</a>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
	return {
		balance : state.balance
	};
};
const mapDispatchToProps = dispatch => {
    return{
		actionGetBalanceC : bindActionCreators(actionGetBalance, dispatch),
    };
};
export default  connect(mapStateToProps, mapDispatchToProps)(Header)
