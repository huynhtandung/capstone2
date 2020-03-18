const Web3 = require('web3');
const rpcURL = 'https://ropsten.infura.io/v3/83f81ef97be34ecfa6700d58a6673888';
const web3 = new Web3(rpcURL)

function send(address, privateKey){
    this.address = address;
    this.privateKey = privateKey;
}

send.prototype.sendEther = async function(toAddress, ether){

    var Tx = require('ethereumjs-tx').Transaction;
    const private_Key_1 = new Buffer.from(this.privateKey,'hex')
    var txCount = await web3.eth.getTransactionCount(this.address);
    try {
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: toAddress,
            value: web3.utils.toHex(web3.utils.toWei(ether.toString(),'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('40','gwei')),
        }
    
        const tx = new Tx(txObject, {chain:'ropsten', hardfork: 'petersburg'});
        tx.sign(private_Key_1);
        const serializedTransaction =tx.serialize();
        const raw ='0x'+serializedTransaction.toString('hex');
        return await web3.eth.sendSignedTransaction(raw, async function(err, txHash){
            if (err) console.log(err);
        });
    }
    catch(err){
        console.log(err);
        return 1;
    }
}

/*
var address = "0x6DeFAd2d9841203B9C7062c143FEd7295d065aaE";
var privateKey = "2c950eba9f6ddbc30db5d607f8db31b4aed7fa12fa9f74b8997cb09fb9af609e";

var Send = new send(address, privateKey);
Send.sendEther("0x174EdBae8245Fc73f7921eEb77468124ECF3D740",1).then(function(res){
    console.log(JSON.stringify(res));
});
*/

module.exports = send;
