const Web3 = require('web3');
var abi = require("./abi");


const rpcURL = 'https://ropsten.infura.io/v3/83f81ef97be34ecfa6700d58a6673888';
const web3 = new Web3(rpcURL)

function get(address){
    this.address = address;
    this.contractAddress = '0xf19Ba915e137808a9145BF5853608Eb6A9FcaC6a';
    //this.contractAddress = '0x5Bd442D9d010372beeb71B192F06669b506dAEf5';
    this.abi = abi;
    this.myAbi = new web3.eth.Contract(this.abi);
    this.myAbi.options.address = this.contractAddress;
    this.myAbi.options.gasPrice = '20000000000000' ; // default gas price in wei
    this.myAbi.options.gas = 50000000 ;

}

get.prototype.getallsv = function(ml){
    return this.myAbi.methods.getall(ml).call({from: this.address}, function(error, result){
        if (error){
            throw error;
        }
    });
    
};

get.prototype.getallDS = function(ml){
    return this.myAbi.methods.getallDS(ml).call({from: this.address}, function(error, result){
        if (error){
            throw error;
        }
    });
    
};



get.prototype.getsv = function(mssv,ml){

    return this.myAbi.methods.getsv(mssv,ml).call({from: this.address}, function(error, result){
        if (error) throw error;
        
    });
};

get.prototype.getall1sv = function(ml, mssv){

    return this.myAbi.methods.getall1sv(ml, mssv).call({from: this.address}, function(error, result){
        if (error) console.log(error);
       
    });
};

get.prototype.getStatus = function(ml){

    return this.myAbi.methods.getStatus(ml).call({from: this.address}, function(error, result){
        if (error) throw error;
       
    });
};

get.prototype.getBalance = async function(listAcc){
    return await web3.eth.getBalance(listAcc)/1000000000000000000;
}

module.exports = get;