var Web3 = require('web3');
var json2xls = require('json2xls');
var fs = require('fs');

var provider = "http://localhost:22000";
var web3;

var txnData = [];
var count;


if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider(provider));
}


(async function getData() {
  count =  web3.eth.blockNumber;
  try {
    //Get Transaction count
    await getTxn();
 
    console.log("Completed Successfully!!!");

  } catch (err) {
    console.log(err);
  }

})()

async function getTxn() {
  var start = 0;
  for (var i = start; i <= count; i++) {
    if(i%500 == 0 || i == start){
      console.log("Writing to file......");
    }
    
    var error, result = await web3.eth.getBlockTransactionCount(i);
    if(!error){
        var err, blkData = await web3.eth.getBlock(i);
        if(!err){

          var unix_timestamp = blkData.timestamp / 1000000;
          var date = new Date(unix_timestamp);
         
          var convertedTimeStamp = ("00" + date.getDate()).slice(-2) + "/" + 
                                   ("00" + (date.getMonth() + 1)).slice(-2) + "/" + 
                                   date.getFullYear() + " " + 
                                   ("00" + date.getHours()).slice(-2) + ":" + 
                                   ("00" + date.getMinutes()).slice(-2) + ":" + 
                                   ("00" + date.getSeconds()).slice(-2);             

          var res = {
            "block": i,
            "transactionCount": result,
            "time": convertedTimeStamp,
        }

         txnData.push(res);
        }
    }
    
    if((i%500 == 0 && i != 0) || i == count){

      var xls = json2xls(txnData);
      fs.writeFileSync('data' + i + '.xlsx', xls, 'binary');
      console.log("written upto " + i);
      txnData = [];

    }

  }
}