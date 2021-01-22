
CLS=/data/roxe/test/cls

usd2gbp_account=re.usdgbp
usd2hkd_account=re.usdhkd
usd2gbp_pubkey=ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH
usd2hkd_pubkey=ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH
DODO_CONTRACT=roxe.earn
trader_account=re.trader
trader_pubkey=ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH

lp_account=re.lp
lp_pubkey=ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH

case "$1" in
"u") $CLS wallet unlock -n v --password PW5KSexTLPfZxhbFKTvjhV6MgyDLmsmMN6Vhp2bSGoRqoDkqFNfoD ;;
"i") $CLS wallet  import --private-key 5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w   -n v 
$CLS wallet  import --private-key 5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8   -n v 
;;
"nl")  
$CLS system newaccount roxe re.lp ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH --stake-net "10000.0000 ROC" --stake-cpu "10000.0000 ROC" --buy-ram "10000.0000 ROC" -p roxe@active
;;
"lpa") 
$CLS push action roxe updateauth '{"account": "'${lp_account}'","permission": "active","parent": "owner","auth": {"threshold":1,"keys": [{"key":"'${lp_pubkey}'","weight": 1}], "waits": [],"accounts": [{"weight": 1,"permission": {"actor":"'${DODO_CONTRACT}'", "permission": "active"}}]}}' -p ${lp_pubkey}@active
;;
"u2ga") 
$CLS push action roxe updateauth '{"account": "'${usd2gbp_account}'","permission": "active","parent": "owner","auth": {"threshold":1,"keys": [{"key":"'${usd2gbp_pubkey}'","weight": 1}], "waits": [],"accounts": [{"weight": 1,"permission": {"actor":"'${DODO_CONTRACT}'","permission": "active"}}]}}' -p  ${usd2gbp_account}@active
;;
"u2ha") 
$CLS push action roxe updateauth '{"account": "'${usd2hkd_account}'","permission": "active","parent": "owner","auth": {"threshold":1,"keys": [{"key":"'${usd2hkd_pubkey}'","weight": 1}], "waits": [],"accounts": [{"weight": 1,"permission": {"actor":"'${DODO_CONTRACT}'", "permission": "active"}}]}}' -p ${usd2hkd_account}@active
;;
"bu2g") 
dodo_name=${usd2gbp_account}
$CLS push action ${DODO_CONTRACT} buybasetoken '{"msg_sender": "'${trader_account}'","dodo_name": "'${dodo_name}'","amount": {"quantity": "0.010000 USD","contract": "roxe.ro"},"maxPayQuote": {"quantity": "1.000000 GBP","contract": "roxe.ro"}}' -p ${trader_account}@active
$CLS push action ${DODO_CONTRACT} sellbastoken '{"msg_sender": "'${trader_account}'","dodo_name": "'${dodo_name}'","amount": {  "quantity": "0.100000 USD",  "contract": "roxe.ro"},"minReceiveQuote": {  "quantity": "0.000001 GBP",  "contract": "roxe.ro"}}' -p ${trader_account}@active
;;
"bu2h") 
dodo_name=${usd2hkd_account}
$CLS push action ${DODO_CONTRACT} buybasetoken '{"msg_sender": "'${trader_account}'","dodo_name": "'${dodo_name}'","depositbase": {"quantity": "0.010000 USD","contract": "roxe.ro"},"maxPayQuote": {"quantity": "1.000000 HKD","contract": "roxe.ro"}}' -p ${trader_account}@active
$CLS push action ${DODO_CONTRACT} sellbastoken '{"msg_sender": "'${trader_account}'","dodo_name": "'${dodo_name}'","amount": {  "quantity": "0.100000 USD",  "contract": "roxe.ro"},"minReceiveQuote": {  "quantity": "0.000001 HKD",  "contract": "roxe.ro"}}' -p ${trader_account}@active
;;
"dwu2g") 
dodo_name=${usd2gbp_account}
$CLS push action ${DODO_CONTRACT} depositbase '{"msg_sender": "'${lp_account}'","dodo_name": "'${dodo_name}'","amt": {"quantity": "4999048.000000 USD","contract": "roxe.ro"}}' -p ${lp_account}@active
$CLS push action ${DODO_CONTRACT} depositquote '{"msg_sender": "'${lp_account}'","dodo_name": "'${dodo_name}'","amt": {"quantity": "3649300.000000 GBP","contract": "roxe.ro"}}' -p ${lp_account}@active
;;
"dwu2h") 
dodo_name=${usd2hkd_account}
$CLS push action ${DODO_CONTRACT} depositbase '{"msg_sender": "'${lp_account}'","dodo_name": "'${dodo_name}'","amt": {"quantity": "9999096.000000 USD","contract": "roxe.ro"}}' -p ${lp_account}@active
$CLS push action ${DODO_CONTRACT} depositquote '{"msg_sender": "'${lp_account}'","dodo_name": "'${dodo_name}'","amt": {"quantity": "77493000.000000 HKD","contract": "roxe.ro"}}' -p ${lp_account}@active
;;
*) echo "u --unlock \n ";;
esac
