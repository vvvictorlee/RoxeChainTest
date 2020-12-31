# python3 dodo.py --cleos="cleos --wallet-url http://10.11.5.37:6666 " --nodeos=nodeos --keosd=keosd --contracts-dir="/Users/lisheng/mygit/vvvictorlee/eoswap/build/contracts" --old-contracts-dir="/Users/lisheng/testchaincontracts/eosio.contracts-1.8.x/build/contracts" -w -a


python3 dodo.py --cleos="cleos --url http://10.11.5.37 " --nodeos=nodeos --keosd=keosd  -w -a


# ./clroxe create key --to-console

# ROXE6m2TpGWE59yDPWuBaB3xSJSgYWkggzSTuDv5vLfS3hYzB6UTU2=KEY:5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w


# Private key: 5JxT1aA8MiZZe7XjN3SYaQ65NSbZXrBcjePaSwRifK7jJLdjSf3
# Public key: ROXE5rM2nqtmCqyeRMpmQQMVTMYYZ9VYq9JDgve4t3Gzy6gVU1wB1z


# Private key: 5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8
# Public key: ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH

# Private key: 5HwYSQMW2Xy37Q9nhdKz7T32eLxwbDq29rMzGXrRQJwveh9B7sG
# Public key: ROXE8Av6ToXNYrGNdiQtpdUAG8LBDoMM3RZnin5NYpHk4WdKwiYk2W

# Private key: 5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN
# Public key: ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX


# ./clroxe wallet create -n v --to-console
# "PW5KSexTLPfZxhbFKTvjhV6MgyDLmsmMN6Vhp2bSGoRqoDkqFNfoD"


# ./clroxe wallet unlock -n v --password PW5KSexTLPfZxhbFKTvjhV6MgyDLmsmMN6Vhp2bSGoRqoDkqFNfoD


# ./clroxe wallet  import --private-key 5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w   -n v
# ./clroxe wallet  import --private-key 5JxT1aA8MiZZe7XjN3SYaQ65NSbZXrBcjePaSwRifK7jJLdjSf3   -n v
# ./clroxe wallet  import --private-key 5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8   -n v




# ./clroxe system newaccount roxe1 eoswapxtoken ROXE5rM2nqtmCqyeRMpmQQMVTMYYZ9VYq9JDgve4t3Gzy6gVU1wB1z --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active

# ./clroxe system newaccount roxe1 eoswapeoswap ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active

# ./clroxe system newaccount roxe1 alice1111111 ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active


# ./clroxe system newaccount roxe1 bob111111111 ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active



# ./clroxe push action roxe newaccount '{"creator" : roxe1, "name" : "alice1111111", "owner" : {"threshold": 1, "keys": [{"key": "ROXE6m2TpGWE59yDPWuBaB3xSJSgYWkggzSTuDv5vLfS3hYzB6UTU2", "weight": 1}], "accounts": [], "waits": []}, "active" : {"threshold": 1, "keys": [{"key": "ROXE8Av6ToXNYrGNdiQtpdUAG8LBDoMM3RZnin5NYpHk4WdKwiYk2W", "weight": 1}], "accounts": [], "waits": []}}' -p roxe1@active


# ./clroxe push action roxe newaccount '{"creator" : roxe1, "name" : "bob111111111", "owner" : {"threshold": 1, "keys": [{"key": "ROXE6m2TpGWE59yDPWuBaB3xSJSgYWkggzSTuDv5vLfS3hYzB6UTU2", "weight": 1}], "accounts": [], "waits": []}, "active" : {"threshold": 1, "keys": [{"key": "ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX", "weight": 1}], "accounts": [], "waits": []}}' -p roxe1@active



# ./clroxe set contract eoswapxtoken /data/roxe/balanceos/RoxeChain/roxe.contracts/build/contracts/roxe.token -p eoswapxtoken
# ./clroxe set contract eoswapeoswap /data/roxe/balanceos/RoxeChain/roxe.contracts/build/contracts/eoswap -p eoswapeoswap


# ./clroxe transfer rox1 eoswapeoswap "1000000.0000 ROC"


# curl http://172.16.213.156:8888/v1/chain/get_info

# curl http://127.0.0.1:8888/v1/chain/get_info

