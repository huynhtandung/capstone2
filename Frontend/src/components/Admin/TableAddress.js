import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toastify from '../../commons/toastify';
import * as actionSendEth from '../../actions/Admin/sendEth'
import * as actionUpdateBalanceForAdmin from '../../actions/Admin/balance'
import * as actionUpdateBalance from '../../actions/Admin/walletAddress'

import { syncBalance } from '../../apis/Admin/index'


let bl = 0;
let actBl = 0;

class Address extends Component {

    constructor(props) {
        super(props)
        this.state = {
            eth: '',
            balance: 0,
            actualBalance: 0,
            name: '',
            index: '',
            render: true,
            address: ''
        }
    }

    sendEth = (address, index) => {
        var ele = document.getElementById(index);
        var amount = ele.value;
        // console.log(amount)
        if (Number(amount) < 1 || Number(amount) > this.props.max) {
            //toastify.toastifyError("Amount is from " +  1 + " to " + Math.round(this.props.max * 100) / 100)
            toastify.toastifyError("Amount is more than 1 and less than the current balance")
        } else {
            const { actionSendEthC } = this.props;
            const { actionSendEth } = actionSendEthC;
            actionSendEth({
                Address: '0x8c457656323C73c91655369F920366AFf8DA0861',
                PrivateKey: '6C3D2E442AC4D0BA3FBA3662A5BEA7FE47E941329ED89EF1940B2F4DAB3B28B9',
                to: address.trim(),
                amount: amount
            })
            ele.value = ''

            const { actionUpdateBalanceForAdminC } = this.props;
            const { actionUpdateBalanceForAdmin } = actionUpdateBalanceForAdminC;
            actionUpdateBalanceForAdmin(amount);

            /*const {actionUpdateBalanceC} = this.props;
            const {actionUpdateBalance} = actionUpdateBalanceC;
            actionUpdateBalance(amount, index);*/

            //document.getElementById(index*-1).innerHTML = Number(document.getElementById(index*-1).innerHTML) + amount

            let n = document.getElementById((index + 1) * -1).innerHTML;
            document.getElementById((index + 1) * -1).innerHTML = Number((n.slice(0, n.length - 4))) + Number(amount) + "eth";

        }
        /*let n = document.getElementById(index*-1).innerHTML;
        document.getElementById(index*-1).innerHTML = (n.slice(0, n.length - 4)) + amount;
        console.log(document.getElementById(index*-1).innerHTML)*/


    }

    onChangeValue = (index) => {
        var ele = document.getElementById(index);
        if (ele.value < 10) {
            this.setState({
                eth: ele.value
            })
        }

        if (ele.value > 10) {
            ele.value = this.state.eth
        }
    }

    setBalance = (a, b, c, d, e) => {
        //console.log(a, b)
        this.setState({
            balance: b,
            actualBalance: a,
            name: c,
            index: d,
            address: e
        })
    }

    synchronize = (index, balance, address) => {
        //update balance in db to match real balance
        syncBalance({ balance, address }).then(res => {
            //update state
            const { actionUpdateBalanceC } = this.props;
            const { actionSynchronizeBalance } = actionUpdateBalanceC;
            actionSynchronizeBalance(index, balance);

            //render component
            this.setState({
                render: !this.state.render
            })
        })
    }

    renderTable = (address, balance) => {
        let xhtml = null;
        xhtml = address.map((record, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
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
                    <td id={(index + 1) * -1}>
                        {balance[index].realBalance !== balance[index].dbBalance ?
                            <button onClick={() => this.setBalance(balance[index].realBalance, balance[index].dbBalance, record.Lecturer_Name ? record.Lecturer_Name : record.AAD_Name ? record.AAD_Name : record.Dean_Name, index, record.WalletAddress)} type="button" className="" data-toggle="modal" data-target="#exampleModal">
                                <i style={{ color: "red", cursor: "pointer", fontSize: "15px" }} className="glyphicon glyphicon-question-sign"></i>
                            </button> : ''}
                        &nbsp;{Math.round(balance[index].realBalance * 100) / 100} eth
                    </td>
                    <td>
                        <input type="number" id={index} step="0.1" max="10" size="5" onChange={() => this.onChangeValue(index)} className="form-control" required="required" />
                    </td>
                    <td>
                        <button onClick={() => this.sendEth(record.WalletAddress, index)} type="submit" className="btn btn-primary">Send</button>
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
                    {/*Modal display balance*/}
                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Violent balance</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Balance in the system: {this.state.balance} eth <br />
                                    Actual Balance: {this.state.actualBalance} eth
                                    <hr />
                                    {+this.state.balance < +this.state.actualBalance
                                        ? `Lecturer ${this.state.name} has transfered money to their wallet`
                                        : `Lecturer ${this.state.name} has used the wallet for personal purpose`
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button onClick={() => this.synchronize(this.state.index, this.state.actualBalance, this.state.address)} data-dismiss="modal" type="button" className="btn btn-primary">Synchronize</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""
        )
    }
}
const mapStateToProps = state => {
    return {
        address: state.walletAddress.address,
        balance: state.walletAddress.balance,
        max: state.balance
    };
};
const mapDispatchToProps = dispatch => {
    return {
        actionSendEthC: bindActionCreators(actionSendEth, dispatch),
        actionUpdateBalanceForAdminC: bindActionCreators(actionUpdateBalanceForAdmin, dispatch),
        actionUpdateBalanceC: bindActionCreators(actionUpdateBalance, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Address)