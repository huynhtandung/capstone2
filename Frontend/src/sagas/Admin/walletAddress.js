import { take, call, put } from 'redux-saga/effects';
import * as consts from '../../constants/Admin/walletAddress';
import { STATUS_CODE } from '../../constants/index';
import { getWalletAddress, getBalance, getBalanceDb } from '../../apis/Admin';
import { actionGetWalletAddressSuccess, actionGetWalletAddressFail } from '../../actions/Admin/walletAddress';

import { showLoading, hideLoading } from '../../actions/loading'


export default function* watchGetWalletAddress() {
    while (true) {
        const action = yield take(consts.GET_WALLET_ADDRESS);
        yield put(showLoading())
        const { params } = action.payload;
        try {
            const res = yield call(getWalletAddress, params);
            const { status, data } = res;
            if (status === STATUS_CODE.SUCCESS) {
                var dl = data;
                console.log('DAY: ', dl, params)
                try {
                    var balance = []
                    for (let i = 0; i < dl.length; i++) {
                        const params = {
                            Address: '0x6DeFAd2d9841203B9C7062c143FEd7295d065aaE',
                            PrivateKey: '2c950eba9f6ddbc30db5d607f8db31b4aed7fa12fa9f74b8997cb09fb9af609e',
                            ListOfAddress: dl[i].WalletAddress.trim()
                        }
                        const res = yield call(getBalance, params)
                        const { status, data } = res
                        const realBalance = data;
                        //console.log(realBalance)
                        /*if (status === STATUS_CODE.SUCCESS) {
                            //console.log(data)
                            res = yield call(getBalanceDb, { ListOfAddress: dl[i].WalletAddress.trim() })
                            status = res.status
                            if (status === STATUS_CODE.SUCCESS) {
                                data = res.data;
                                console.log(realBalance, data)
                                balance.push([realBalance, data])
                            }
                            // balance.push(data)
                        }*/
                        if (status === STATUS_CODE.SUCCESS) {
                            balance.push(realBalance)

                            
                        }


                    }
                    //console.log(balance)

                } catch (err) { }

                console.log(data)
                yield put(actionGetWalletAddressSuccess({
                    address: data,
                    balance: balance
                }));
            }
        } catch (err) {
            yield put(actionGetWalletAddressFail(err.message));
        }
        yield put(hideLoading())
    }
}