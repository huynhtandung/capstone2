var getTransaction = require("./GetAdd/getTransaction");

function Data(){

}

Data.prototype.getData = async function getMore(listTrans){
    var res = [];
    for (let i in listTrans){
    //    console.log(hash);    
        let GetTransaction = new getTransaction(listTrans[i]);
        let r = await GetTransaction.Input();
        res.push(r);
    }
    console.log(JSON.stringify(res));
    return res;
//    console.log(res);
}

//getMore(list);

module.exports = new Data();