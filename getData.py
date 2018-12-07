from web3 import Web3
from web3.middleware import geth_poa_middleware
import json
import time
import datetime

my_provider = Web3.HTTPProvider('http://137.116.200.211:22000')
w3 = Web3(my_provider)
w3.middleware_stack.inject(geth_poa_middleware, layer=0)
count = w3.eth.blockNumber

for i in range(count): 
    block = w3.eth.getBlock(i)
    timeStamp = block.timestamp

    value = time.strftime('%m/%d/%Y %H:%M:%S',  time.gmtime(timeStamp/1000000.))
    # value = datetime.datetime.fromtimestamp(timeStamp)
    # exct_time = value.strftime('%d %B %Y %H:%M:%S')

    # dateTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(timeStamp / 1000000))
    txnCount = w3.eth.getBlockTransactionCount(i)
    for j in range(txnCount): 
        if ( j==1 ): 
            print(timeStamp) 
            print(value)
        

