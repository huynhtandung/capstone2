var get = require("./GetAdd/get");
var add = require("./GetAdd/add");
//var address = "0x6DeFAd2d9841203B9C7062c143FEd7295d065aaE";
//var privateKey = "2c950eba9f6ddbc30db5d607f8db31b4aed7fa12fa9f74b8997cb09fb9af609e";
var sendEther = require("./GetAdd/sendEther");

var emitter = require("eventemitter3");
var Emitter = new emitter();

Emitter.on("true", function(){
    console.log("Confirmed Transaction!");
});

Emitter.on("false", function(){
    console.log("Failed Transaction!");
});


function blockchain(address, privateKey){
    this.Get = new get(address);
    this.Add = new add(address, privateKey);
    this.SendEth = new sendEther(address, privateKey)
}


//ml is string
blockchain.prototype.getAll = async function(ml) {
     
    var res = await this.Get.getallsv(ml);
    var re = res[0];
    var num;
    var cl = [];
    for (num  = 0; num < 200; num++){
        if (re[10][num] === "")
            break;
        else cl.push(re[10][num]);
    }
    var per = res[1];
    
    
    var c = [];
    for (let i = 0; i < 10; i ++){
        let cc = [];
        for (let j = 0; j < num; j++){
            cc.push(re[i][j]);
        }
        c.push(cc);
    }
    
    var ob = {
        ml:ml,
        siso: num,
        bangdiem: c,
        percent: per,
        class: cl
    }
    
    return ob;
}
// ml, mssv is string
blockchain.prototype.get1sv = async function(ml, mssv){
    var re = await this.Get.getsv(mssv, ml);
    var diem = [];
    var percent = [];
    for (let i = 0; i < 10; i++){
        diem.push(re[i]);
        percent.push(re[i+10]);
    }
    var ob = {
        ml:ml,
        mssv: mssv,
        diem: diem,
        percent: percent
    }
    return ob;

}

// mssv is string, ml is array of string
blockchain.prototype.getAll1sv = async function(ml, mssv){
    var re = await this.Get.getall1sv(ml, mssv);
    var mon = ml.length;
    var per = [];
    var c = [];
    var final = [];
    for (let i = 0; i < mon; i++){
        
        let cc = [];
        let p = [];
        for (let j = 0; j < 9; j++){
            if (re[i+100][j] == "") break;
            cc.push(re[i][j]);
            p.push(re[i+100][j]);
        }
        let sum = 0;
        if (p.length == 0) final.push(null);
        for (let j = 0; j < p.length; j++){
            
            if (cc[j] === ""){
                final.push(null);
                break;
            }
            else {
                let a = cc[j]*1;
                let b = p[j].substring(p[j].lastIndexOf("-"), p[j].length);
                b = b.match(/\d/g);
                b = b.join("")*1;
                sum += 1.0*a/10*b;
            }
        }
        if (final.length === per.length) final.push(sum.toFixed(2));

        per.push(p);   
        c.push(cc);
    }
    
    
    var ob = {
        mssv: mssv,
        diem: c,
        percent: per,
        final: final
    }

    return ob;
}

blockchain.prototype.getStatus = async function(ml){
    var res = await this.Get.getStatus(ml);
    var ob = {
        status: res[0],
        percent : res[1]
    }
    return ob;
}



// ml is string, listsv is array of string (mssv)
blockchain.prototype.addsv_perc = async function(ml, listsv, perc){
    var res = await this.Add.addsv_perc(ml, listsv, perc);
    if (res.status) Emitter.emit("true");
    else Emitter.emit("false");
    return res;//.transactionHash; 
}

//ml is string, listgr is array of string, id is int
blockchain.prototype.addgr = async function(ml, listgr, id){
    var res = await this.Add.addgr(ml, listgr, id);
    if (res.status) Emitter.emit("true");
    else Emitter.emit("false");
    return res.transactionHash;
}

// listper is array of string, ml is string
blockchain.prototype.addper = async function(listper, ml){
    var res = await this.Add.addPercent(listper, ml);
    if (res.status) Emitter.emit("true");
    else Emitter.emit("false");
    return res.transactionHash;
}

blockchain.prototype.acceptREQ = async function(dicision, idGrade, ml){
    var res = await this.Add.acceptREQ(dicision,idGrade, ml);
    if (res.status) Emitter.emit("true");
    else Emitter.emit("false");
    return res.transactionHash;
}

blockchain.prototype.sendRQ = async function(idGrade, ml){
    var res = await this.Add.sendRQ(idGrade, ml);
    if (res.status) Emitter.emit("true");
    else Emitter.emit("false");
    return res.transactionHash;
}

blockchain.prototype.sendEther = async function(toAddress, ether){
    var res = await this.SendEth.sendEther( toAddress, ether);
    if (res.status) Emitter.emit("true");
    else Emitter.emit("false");
    return res.transactionHash;
}

blockchain.prototype.getBalance = async function(listAcc){
    return res = await this.Get.getBalance(listAcc);
}


module.exports = blockchain;

