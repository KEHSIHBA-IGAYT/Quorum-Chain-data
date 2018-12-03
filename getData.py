from web3 import Web3
from web3.middleware import geth_poa_middleware

my_provider = Web3.HTTPProvider('http://137.116.200.211:22000')
w3 = Web3(my_provider)
w3.middleware_stack.inject(geth_poa_middleware, layer=0)
print(w3.eth.getBlock(1))
