
CLS=/data/roxe/test/cls

case "$1" in
"u") $CLS wallet unlock -n v --password PW5KSexTLPfZxhbFKTvjhV6MgyDLmsmMN6Vhp2bSGoRqoDkqFNfoD ;;
"i") $CLS wallet  import --private-key 5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w   -n v ;;
"n") 
$CLS system newaccount roxe1 eosdosxtoken ROXE5rM2nqtmCqyeRMpmQQMVTMYYZ9VYq9JDgve4t3Gzy6gVU1wB1z --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS system newaccount roxe1 eosdoseosdos ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS system newaccount roxe1 tokenissuer1 ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS system newaccount roxe1 maintainer11 ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS system newaccount roxe1 eosdosoracle ROXE5rM2nqtmCqyeRMpmQQMVTMYYZ9VYq9JDgve4t3Gzy6gVU1wB1z --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS system newaccount roxe1 ethbasemkr11 ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS system newaccount roxe1 ethquotemkr1 ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS system newaccount roxe1 carol1111111 ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS system newaccount roxe1 dodoowner111 ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
;;
"d")  
$CLS set contract eosdosxtoken /data/roxe/balanceos/RoxeChain/roxe.contracts/build/contracts/roxe.token -p eosdosxtoken
$CLS set contract ethbasemkr11 /data/roxe/balanceos/RoxeChain/roxe.contracts/build/contracts/roxe.token -p ethbasemkr11
$CLS set contract ethquotemkr1 /data/roxe/balanceos/RoxeChain/roxe.contracts/build/contracts/roxe.token -p ethquotemkr1
;;
"e")  
$CLS set contract eosdoseosdos /data/roxe/balanceos/RoxeChain/roxe.contracts/build/contracts/eosdos -p eosdoseosdos
;;
"s") 
$CLS system newaccount roxe1 daimkrdaimkr ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS set contract daimkrdaimkr /data/roxe/balanceos/RoxeChain/roxe.contracts/build/contracts/roxe.token -p daimkrdaimkr
;;
"ss") 
$CLS system newaccount roxe1 dai2mkr11111 ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS set contract dai2mkr11111 /data/roxe/balanceos/RoxeChain/roxe.contracts/build/contracts/roxe.token -p dai2mkr11111
;;
# roUSD - roGBP 的池子： 100万美金  75万英镑
# roUSD - roHKD的池子： 100万美金  775万港币
"u2g") 
$CLS system newaccount roxe1 usd2gbp2222 ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS set contract usd2gbp2222 /data/roxe/balanceos/RoxeChain/roxe.contracts/build/contracts/roxe.token -p usd2gbp2222
;;
"u2h") 
$CLS system newaccount roxe1 usd2hkd2222 ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe1@active
$CLS set contract usd2hkd2222 /data/roxe/balanceos/RoxeChain/roxe.contracts/build/contracts/roxe.token -p usd2hkd2222
;;
"t") 
$CLS transfer rox1 eoswapeoswap "1000000.0000 ROC"
;;
"g") 
 curl -X POST --url http://10.100.1.10:8888/v1/chain/get_account -d '{
  "account_name": "eoswapeoswap"
}'|jq
;;
"gt") 
curl -X POST --url http://172.17.3.161:8888/v1/chain/get_table_rows -d '{  
   "scope":"eoswapeoswap",
   "code":"eoswapeoswap",
   "table":"poolstore",
   "json":true
}' |jq
;;
"dodos") 
curl -X POST --url http://172.17.3.161:8888/v1/chain/get_table_rows -d '{  
   "scope":"eosdoseosdos",
   "code":"eosdoseosdos",
   "table":"dodos",
   "json":true
}' |jq
;;
"if") 
curl http://10.100.1.10:8888/v1/chain/get_info|jq
curl http://172.17.3.161:8888/v1/chain/get_info|jq
;;
*) echo "u --unlock \n n --new account \n d  --depoly contract";;
esac



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

# eosdosxtoken
    #   admin              = N(eosdoseosdos);
    #   doowner            = N(dodoowner111);
    #   tokenissuer        = N(tokenissuer1);
    #   maintainer         = N(maintainer11);
    #   oracleadmin        = N(eosdosoracle);
    #   lp                 = N(alice);
    #   trader             = N(bob);
    #   dodo_ethbase_name  = N(ethbasemkr11);
    #   dodo_ethquote_name = N(ethquotemkr1);
######################## eosdos

# http://10.100.1.10:8889/v1/wallet/list_wallets
# http://10.100.1.10:8889/v1/wallet/create_key
# curl http://localhost:6666/v1/wallet/create_key -X POST -d '["default","K1"]' default 为钱包名




# python3 bios-boot-tutorial.py --cleos="cleos --wallet-url http://10.11.5.37:6666 " --nodeos=nodeos --keosd=keosd --contracts-dir="/Users/lisheng/mygit/vvvictorlee/eoswap/build/contracts" --old-contracts-dir="/Users/lisheng/testchaincontracts/eosio.contracts-1.8.x/build/contracts" -w -a


# cleos --wallet-url http://10.11.5.37:6666 --url http://10.11.5.37:8000 set contract eoswapeoswap /Users/lisheng/mygit/vvvictorlee/eoswap/build/contracts/eoswap/


# cleos --wallet-url http://10.11.5.37:6666 --url http://10.11.5.37:8000 push action eoswapeoswap extransfer '[["useraaaaaaab","useraaaaaaac",["1.0000 SYS","eosio.token"],""]]'

# cleos --wallet-url http://10.11.5.37:6666 --url http://10.11.5.37:8000  set account permission useraaaaaaab  active '{"threshold": 1,"keys": [{"key": "'EOS7yBtksm8Kkg85r4in4uCbfN77uRwe82apM8jjbhFVDgEgz3w8S'","weight": 1}],"accounts": [{"permission":{"actor":"'eoswapeoswap'","permission":"eosio.code"},"weight":1}]}' owner -p useraaaaaaab@owner

# cleos --wallet-url http://10.11.5.37:6666 --url http://10.11.5.37:8000 push action eoswapeoswap extransfer '["useraaaaaaab","useraaaaaaac",{quantity : "1.0000 SYS",contract : "eosio.token"},""]' -p useraaaaaaab@active

# cleos --wallet-url http://10.11.5.37:6666 --url http://10.11.5.37:8000 get scope eosio.token stats

# curl -X POST --url http://10.11.5.37:8000/v1/chain/get_table_by_scope -d '{
#   "code": "eosio.token",
#   "table": "accounts"
# }'

# curl -X POST --url http://10.11.5.37:8000/v1/chain/get_table_rows -d '{  
#    "scope":"eosio",
#    "code":"eosio.token",
#    "table":"accounts",
#    "json":true
# }'

curl -X POST --url http://172.17.3.161:8888/v1/chain/get_table_rows -d '{  
    "scope":"112acnogsedo",
    "code":"eoswapxtoken",
    "table":"accounts",
    "json":true
 }'



# curl -X POST --url http://10.11.5.37:8000/v1/chain/get_code_hash -d '{
#   "account_name": "eosio.token"
# }'

# curl -X POST --url http://172.17.3.161:8888/v1/chain/get_account -d '{
#   "account_name": "112acnogsedo"
# }'

curl -X POST --url http://172.17.3.161:8888/v1/chain/get_account -d '{
   "account_name": "112acnogsedo"
 }'

# curl  http://10.11.5.37:8000/v1/wallet/list_keys


# curl -X POST --url http://127.0.0.1:8888/v1/history/get_transaction -d '{	"id":"37932d090584e3d2c661122c1a331cb970b412596c455e73a83dd5b980869ef5"}' | jq

# curl -X POST --url http://172.17.3.161:8888/v1/history/get_transaction -d '{	"id":"37932d090584e3d2c661122c1a331cb970b412596c455e73a83dd5b980869ef5"}' | jq
# curl -X POST --url http://172.17.3.161:8888/v1/history/get_transaction -d '{	"id":"df9f3044ad1f3fe84c71f99c23f7a1b6c4871921858108e12a89e95c70eff2d7"}' | jq

# curl -X POST --url http://172.17.3.161:8888/v1/history/get_actions -d '{	"pos":0,	"offset":2,	"account_name":"eoswapeoswap"}'

# curl -X POST --url http://172.17.3.161:8888/v1/chain/get_block -d '{
#   "block_num_or_id": "8944822"
# }'


# curl http://172.17.3.161:8888/v1/chain/get_info

# curl -X POST --url http://10.100.1.10:8888/v1/chain/get_block -d '{
#   "block_num_or_id": "8611852"
# }'|jq


# curl -X POST --url http://10.100.1.10:8888/v1/history/get_transaction -d '{	"id":"1915a7f45f9f44ed2e0ce02896c73c46516200e84257504492052e7edf55e58d"}'


#  curl http://192.168.38.227:5363/swap
#  curl http://192.168.38.227:5363/dodo



# clroxe convert unpack_transaction '{
#   "signatures": [
#     "SIG_K1_KmRbWahefwxs6uyCGNR6wNRjw7cntEeFQhNCbyg8S92Kbp7zdSSVGTD2QS7pNVWgcU126zpxaBp9CwUxFpRwSnfkjd46bS"
#   ],
#   "compression": "none",
#   "packed_context_free_data": "",
#   "packed_trx": "8468635b7f379feeb95500000000010000000000ea305500409e9a2264b89a010000000000ea305500000000a8ed3232660000000000ea305500a6823403ea30550100000001000240cc0bf90a5656c8bb81f0eb86f49f89613c5cd988c018715d4646c6bd0ad3d8010000000100000001000240cc0bf90a5656c8bb81f0eb86f49f89613c5cd988c018715d4646c6bd0ad3d80100000000"
# }'



# let data1 = await eos.setcode(contractAccount, 0, 0, wasm) 
# console.log("deploy:data1:")
# let data2 = await eos.setabi(contractAccount, JSON.parse(abi)) 
# console.log("deploy:data2:")



# const fs = require("fs");
# const wasm = fs.readFileSync("/path/to/wasm/file");
# const abi = JSON.parse(fs.readFileSync("/path/to/abi/file"));
# 部署合约时，只调用如下代码即可：

# eos.setcode("your_account_name", 0, 0, wasm);




# zip wasms eosdos/eosdos* eoswap/eoswap* roxe.token/roxe.token*
