var blockchain = require("./index");

var address = "0x6DeFAd2d9841203B9C7062c143FEd7295d065aaE";
var privateKey = "2c950eba9f6ddbc30db5d607f8db31b4aed7fa12fa9f74b8997cb09fb9af609e";
var BlockChain  = new blockchain(address, privateKey);



/*

BlockChain.get1sv("lop1", "1221").then(function(re){
    //    re = JSON.stringify(re);
        console.log(re);
    });
BlockChain.getStatus("lop1").then(function(res){
    console.log(res);
});

BlockChain.getAll("lop1").then(function(re){
    //    re = JSON.stringify(re);
        console.log(re);
    });

     
    
    ;
    
    


*/

/*
var a = "30";
a = 2.9545;
console.log(a.toFixed(4));
console.log(a.toFixed(2));


var txt = "#div-name-1234-characteristic:561613213213";
var numb = txt.match(/\d/g);
numb = numb.join("")
console.log(numb);
console.log(typeof(numb.lastIndexOf("6")));


BlockChain.getAll1sv(["lop1", "lop2"], "1221").then(function(re){
    //    re = JSON.stringify(re);
        console.log(re);
})

*/



/*


BlockChain.getAll1sv(["2019-2020-I-3-CMU-SE252HIS", "2019-2020-II-4-IS384AIS", "2020-2021-I-5-IS301P", "2020-2021-II-6-CMU-CS447AIS", "2019-2020-I-7-CMU-CS311AIS", "2019-2020-I-9-TEST", "2019-2020-II-12-TEST1"], "2221128422").then(function(re){
    //    re = JSON.stringify(re);
        console.log(re);
}); 

BlockChain.sendRQ(0, "lop1").then(function(re){
    console.log(re);
});

BlockChain.getAll("lop3").then(function(re){
    //    re = JSON.stringify(re);
        console.log(re);
    });

    
BlockChain.acceptREQ(1, 0, "lop1").then(function(re){
    console.log(re);
});
BlockChain.addgr("lop1", ["10", "10", "10"], 1).then(function(re){
    console.log(re);
});

;

BlockChain.addper(["a-10", "b-20", "c-50"], "lop2").then(function(re){
    console.log(re);
});

*/

/*
var getTransaction = require("./getTransaction");
var GetTransaction = new getTransaction("0x5922b513ab44f6be563cac56f990050eeddcc43fa213a0b4a06e2c1921219cc3");

GetTransaction.Input().then(function(re){
    console.log(JSON.stringify(re));
});

GetTransaction.Fee().then(function(re){
    console.log(JSON.stringify(re));
});

*/

var Data = require("./transactiondata");

var list = ["0x43b79527c3ff684f05ed636671c10bdf5d5494a4e1ec14f6532b1c2a695d7564",
"0xeb3206d91f98c6ba374d625905a1944d494197232a6fc2fd981435197b6ba43e",
"0xb62928ccf52c6e94b4a10d01debf7cbe61c64bae7807ac6f65c32d98bd81daeb",
"0x44f9cdf9bf90721fc9c000c5ff0824a8d5e7ee1460ce12262c989d6276f42231"];


Data.getData(list);