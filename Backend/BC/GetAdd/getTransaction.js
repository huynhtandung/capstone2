const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/83f81ef97be34ecfa6700d58a6673888";
const web3 = new Web3(rpcURL);
var abi = require("./abi");
var abiDecoder = require("abi-decoder");
abiDecoder.addABI(abi);

function GetTransaction(txHash) {
  this.txhash = txHash;
}

GetTransaction.prototype.Input = async function () {
  try {
    var res = await web3.eth.getTransaction(this.txhash);
    var c = abiDecoder.decodeMethod(res.input);
    return c.params[1].value;
  } catch (err) {
    return null;
  }
};

GetTransaction.prototype.Fee = async function () {
  try {
    var res = await web3.eth.getTransactionReceipt(this.txhash);
    var gas = res.gasUsed;
    gas = (1.0 * gas * 40) / 1000000000;
    return gas;
  } catch (err) {
    return null;
  }
};

module.exports = GetTransaction;
