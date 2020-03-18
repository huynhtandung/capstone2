import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toastify from '../../commons/toastify';
import * as actionSendEth from '../../actions/Admin/sendEth'
import * as actionUpdateBalanceForAdmin from '../../actions/Admin/balance'
import * as actionUpdateBalance from '../../actions/Admin/walletAddress'

class Address extends Component {

    constructor(props){
        super(props)
        this.state = {
            eth : ''
        }
    }

    sendEth = (address, index) =>{
        var ele = document.getElementById(index);
        var amount = ele.value;
       // console.log(amount)
        if (Number(amount) < 1 || Number(amount) > this.props.max){
            //toastify.toastifyError("Amount is from " +  1 + " to " + Math.round(this.props.max * 100) / 100)
            toastify.toastifyError("Amount is more than 1 and less than the current balance")
        }else{
            const {actionSendEthC} = this.props;
            const {actionSendEth} = actionSendEthC;
            actionSendEth({
                Address: '0x8c457656323C73c91655369F920366AFf8DA0861',
                PrivateKey : '6C3D2E442AC4D0BA3FBA3662A5BEA7FE47E941329ED89EF1940B2F4DAB3B28B9',
                to: address.trim(),
                amount : amount
            })
            ele.value = ''

            const {actionUpdateBalanceForAdminC} = this.props;
            const {actionUpdateBalanceForAdmin} = actionUpdateBalanceForAdminC;
            actionUpdateBalanceForAdmin(amount);

            /*const {actionUpdateBalanceC} = this.props;
            const {actionUpdateBalance} = actionUpdateBalanceC;
            actionUpdateBalance(amount, index);*/
            
            //document.getElementById(index*-1).innerHTML = Number(document.getElementById(index*-1).innerHTML) + amount

            let n = document.getElementById((index+1)*-1).innerHTML;
            document.getElementById((index+1)*-1).innerHTML = Number((n.slice(0, n.length - 4))) + Number(amount) + "eth";

        }
        /*let n = document.getElementById(index*-1).innerHTML;
        document.getElementById(index*-1).innerHTML = (n.slice(0, n.length - 4)) + amount;
        console.log(document.getElementById(index*-1).innerHTML)*/


    }

    onChangeValue = (index) =>{
        var ele = document.getElementById(index);
        if(ele.value < 10){
            this.setState({
                eth : ele.value
            })
        }
        
        if(ele.value > 10){
            ele.value = this.state.eth
        }
    }

    renderTable = (address, balance) =>{
        let xhtml = null;
        xhtml = address.map((record, index)=>{
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        {
                            record.Lecturer_Name ? record.Lecturer_Name : record.AAD_Name ? record.AAD_Name : record.Dean_Name
                        }
                    </td>
                    {/*<td>
                        {
                            record.Lecturer_Email ? record.Lecturer_Email : record.AAD_Email
                        }
                    </td>*/}
                    <td>{record.WalletAddress}</td>
                    <td id={(index+1)*-1}>{Math.round(balance[index] * 100) / 100} eth</td>
                    <td>
                        <input type="number" id={index} step="0.1" max="10" onChange={()=>this.onChangeValue(index)} className="form-control" required="required" />
                    </td>
                    <td>
                        <button onClick={()=>this.sendEth(record.WalletAddress, index)} type="submit" className="btn btn-primary">Send</button>
                    </td>
                </tr>
            )
        })
        return xhtml;
    }
    render() {
        return (
            this.props.address.length > 0 
            ? 
                <div> 
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                   
                                    <th>Address</th>
                                    <th>Balance</th>
                                    <th>Ethereum</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTable(this.props.address, this.props.balance)}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            : "" 
        )
    }
}
const mapStateToProps = state => {
	return {
        address : state.walletAddress.address,
        balance : state.walletAddress.balance,
        max : state.balance
	};
};
const mapDispatchToProps = dispatch => {
    return{
        actionSendEthC : bindActionCreators(actionSendEth, dispatch),
        actionUpdateBalanceForAdminC : bindActionCreators(actionUpdateBalanceForAdmin, dispatch),
        actionUpdateBalanceC : bindActionCreators(actionUpdateBalance, dispatch)
    };
};
export default  connect(mapStateToProps, mapDispatchToProps)(Address)