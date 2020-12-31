#!/usr/bin/env python3

import argparse
import json

import os
import random
import re
import subprocess
import sys
import time

args = None
logFile = None

unlockTimeout = 999999999

testAccounts = [
    'usd2gbp44444',
    'usd2hkd44444',
]


def jsonArg(a):
    return " '" + json.dumps(a) + "' "


def run(args):
    print('roxeearn.py:', args)
    logFile.write(args + '\n')
    if subprocess.call(args, shell=True):
        print('roxeearn.py: exiting because of error')
        sys.exit(1)


def retry(args):
    while True:
        print('roxeearn.py: ', args)
        logFile.write(args + '\n')
        if subprocess.call(args, shell=True):
            print('*** Retry')
        else:
            break


def background(args):
    print('roxeearn.py:', args)
    logFile.write(args + '\n')
    return subprocess.Popen(args, shell=True)


def getOutput(args):
    print('roxeearn.py:', args)
    logFile.write(args + '\n')
    proc = subprocess.Popen(args, shell=True, stdout=subprocess.PIPE)
    return proc.communicate()[0].decode('utf-8')


def getJsonOutput(args):
    return json.loads(getOutput(args))


def sleep(t):
    print('sleep', t, '...')
    time.sleep(t)
    print('resume')

#  cleos --wallet-url http://127.0.0.1:6666 --url http://127.0.0.1:8000  set account permission useraaaaaaab  active '{"threshold": 1,"keys": [{"key": "'EOS7yBtksm8Kkg85r4in4uCbfN77uRwe82apM8jjbhFVDgEgz3w8S'","weight": 1}],"accounts": [{"permission":{"actor":"'eosdoseosdos'","permission":"eosio.code"},"weight":1}]}' owner -p useraaaaaaab@owner

# updateAuth(account, 'active', 'owner', controller)
# updateAuth("usd2gbp44444", 'active', 'owner', 'roxe.code')
# updateAuth("usd2hkd44444", 'active', 'owner', 'roxe.code')
def updateAuth(account, permission, parent, controller):
    run(args.cleos + 'push action roxe updateauth' + jsonArg({
        'account': account,
        'permission': permission,
        'parent': parent,
        'auth': {
            'threshold': 1, 'keys': [], 'waits': [],
            'accounts': [{
                'weight': 1,
                'permission': {'actor': controller, 'permission': 'active'}
            }]
        }
    }) + '-p ' + account + '@' + permission)


def createdodo():
    # "breeddodo", msg_sender, dodo_name, maintainer, baseToken, quoteToken, oracle, lpFeeRate, mtFeeRate, k, gasPriceLimit
    run(args.cleos +
        'push action roxe.earn breeddodo \'["roxe.earn", "usd2gbp44444","roxe.earn","6,USD@roxe.ro","6,GBP@roxe.ro","orc.polygon","595","105","100","0"]\' -p roxe.earn')
    run(args.cleos +
        'push action roxe.earn breeddodo \'["roxe.earn", "usd2hkd44444","roxe.earn","6,USD@roxe.ro","6,HKD@roxe.ro","orc.polygon","680","120","100","0"]\' -p roxe.earn')
    sleep(1)

#  async enable() {
#         const dodo_name = this.pair_data.base.DODO_NAME;
#         // await this.common_client.pushAction("enabletradin", Dos.admin, dodo_name);
#         // await this.common_client.pushAction("enablequodep", Dos.admin, dodo_name);
#         // await this.common_client.pushAction("enablebasdep", Dos.admin, dodo_name);
#         await this.common_client.pushAction("setparameter", Dos.admin, dodo_name,"trading",1);
#         await this.common_client.pushAction("setparameter", Dos.admin, dodo_name,"quotedeposit",1);
#         await this.common_client.pushAction("setparameter", Dos.admin, dodo_name,"basedeposit",1);
#     }


def enable():
    # "breeddodo", msg_sender, dodo_name, maintainer, baseToken, quoteToken, oracle, lpFeeRate, mtFeeRate, k, gasPriceLimit
    run(args.cleos +
        'push action roxe.earn setparameter \'["roxe.earn", "usd2gbp44444","trading","1"]\' -p roxe.earn')
    run(args.cleos +
        'push action roxe.earn setparameter \'["roxe.earn", "usd2gbp44444","quotedeposit","1"]\' -p roxe.earn')
    run(args.cleos +
        'push action roxe.earn setparameter \'["roxe.earn", "usd2gbp44444","basedeposit","1"]\' -p roxe.earn')

    run(args.cleos +
        'push action roxe.earn setparameter \'["roxe.earn", "usd2hkd44444","trading","1"]\' -p roxe.earn')
    run(args.cleos +
        'push action roxe.earn setparameter \'["roxe.earn", "usd2hkd44444","quotedeposit","1"]\' -p roxe.earn')
    run(args.cleos +
        'push action roxe.earn setparameter \'["roxe.earn", "usd2hkd44444","basedeposit","1"]\' -p roxe.earn')

    sleep(1)

#     async setprice() {
#         await this.common_client.pushAction("setprice", Dos.oracleadmin, ClientUtil.to_sym(this.pair_data.base.tokens[0]), ClientUtil.to_asset(this.pair_data.oracleprice, this.pair_data.base.tokens[1]));
#     }


def setprice():
    run(args.cleos +
        'push action roxe.earn setprice \'["orc.polygon", "6,USD@roxe.ro","0.740000 GBP@roxe.ro"]\' -p roxe.earn')
    run(args.cleos +
        'push action roxe.earn setprice \'["orc.polygon", "6,USD@roxe.ro","7.750000 HKD@roxe.ro"]\' -p roxe.earn')

    sleep(1)

#     async depositbasequote() {
#         const dodo_name = this.pair_data.base.DODO_NAME;
#         const baseamount = this.pair_data.depositdata.baseamount;
#         const quoteamount = this.pair_data.depositdata.quoteamount;
#         await this.common_client.pushAction("depositbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(baseamount, this.pair_data.base.tokens[0]));
#         await this.common_client.pushAction("depositquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(quoteamount, this.pair_data.base.tokens[1]));
#     }

# 港币-美元 ： 7000 - 904，  英镑-美元：700 - 952


def depositbasequote():
    run(args.cleos +
        'push action roxe.earn depositbase \'["roxe.earn", "usd2gbp44444","952.000000 USD@roxe.ro"]\' -p roxe.earn')
    run(args.cleos +
        'push action roxe.earn depositquote \'["roxe.earn","usd2gbp44444","700.000000 GBP@roxe.ro"]\' -p roxe.earn')

    run(args.cleos +
        'push action roxe.earn depositbase \'["roxe.earn", "usd2hkd44444","904.000000 USD@roxe.ro"]\' -p roxe.earn')
    run(args.cleos +
        'push action roxe.earn depositquote \'["roxe.earn","usd2hkd44444","7000.000000 HKD@roxe.ro"]\' -p roxe.earn')

    sleep(1)


def stepLog():
    run('tail -n 60 ' + args.nodes_dir + '00-eosio/stderr')

# Command Line Arguments


parser = argparse.ArgumentParser()

commands = [
    ('c', 'new',                createdodo,
     True,    "Show tail of node's log"),
    ('e', 'enable',                enable,
     True,    "Show tail of node's log"),
    ('e', 'deposit',                depositbasequote,
     True,    "Show tail of node's log"),
]

parser.add_argument('--public-key', metavar='', help="EOSIO Public Key",
                    default='EOS8Znrtgwt8TfpmbVpTKvA2oB8Nqey625CLN8bCN3TEbgx86Dsvr', dest="public_key")
parser.add_argument('--private-Key', metavar='', help="EOSIO Private Key",
                    default='5K463ynhZoCDDa4RDcr63cUwWLTnKqmdcoTKTHBjqoKfv4u5V7p', dest="private_key")
parser.add_argument('--cleos', metavar='', help="Cleos command",
                    default='../../build/programs/cleos/cleos --wallet-url http://10.11.5.37:6666 ')
parser.add_argument('--nodeos', metavar='', help="Path to nodeos binary",
                    default='../../build/programs/nodeos/nodeos')
parser.add_argument('--keosd', metavar='', help="Path to keosd binary",
                    default='../../build/programs/keosd/keosd')
parser.add_argument('--contracts-dir', metavar='',
                    help="Path to latest contracts directory", default='../../build/contracts/')
parser.add_argument('--old-contracts-dir', metavar='',
                    help="Path to 1.8.x contracts directory", default='../../build/contracts/')
parser.add_argument('--nodes-dir', metavar='',
                    help="Path to nodes directory", default='./nodes/')
parser.add_argument('--genesis', metavar='',
                    help="Path to genesis.json", default="./genesis.json")
parser.add_argument('--wallet-dir', metavar='',
                    help="Path to wallet directory", default='./wallet/')
parser.add_argument('--log-path', metavar='',
                    help="Path to log file", default='./output.log')
parser.add_argument('--symbol', metavar='',
                    help="The eosio.system symbol", default='SYS')
parser.add_argument('--user-limit', metavar='',
                    help="Max number of users. (0 = no limit)", type=int, default=30)
parser.add_argument('--max-user-keys', metavar='',
                    help="Maximum user keys to import into wallet", type=int, default=10)
parser.add_argument('--ram-funds', metavar='',
                    help="How much funds for each user to spend on ram", type=float, default=100.0)
parser.add_argument('--min-stake', metavar='',
                    help="Minimum stake before allocating unstaked funds", type=float, default=0.9)
parser.add_argument('--max-unstaked', metavar='',
                    help="Maximum unstaked funds", type=float, default=10)
parser.add_argument('--producer-limit', metavar='',
                    help="Maximum number of producers. (0 = no limit)", type=int, default=0)
parser.add_argument('--min-producer-funds', metavar='',
                    help="Minimum producer funds", type=float, default=1000.0000)
parser.add_argument('--num-producers-vote', metavar='',
                    help="Number of producers for which each user votes", type=int, default=20)
parser.add_argument('--num-voters', metavar='',
                    help="Number of voters", type=int, default=10)
parser.add_argument('--num-senders', metavar='',
                    help="Number of users to transfer funds randomly", type=int, default=10)
parser.add_argument('--producer-sync-delay', metavar='',
                    help="Time (s) to sleep to allow producers to sync", type=int, default=80)
parser.add_argument('-a', '--all', action='store_true',
                    help="Do everything marked with (*)")
parser.add_argument('-H', '--http-port', type=int,
                    default=8000, metavar='', help='HTTP port for cleos')

for (flag, command, function, inAll, help) in commands:
    prefix = ''
    if inAll:
        prefix += '*'
    if prefix:
        help = '(' + prefix + ') ' + help
    if flag:
        parser.add_argument('-' + flag, '--' + command,
                            action='store_true', help=help, dest=command)
    else:
        parser.add_argument(
            '--' + command, action='store_true', help=help, dest=command)

args = parser.parse_args()

# args.cleos += '--url http://10.11.5.37:%d ' % args.http_port

logFile.write('\n\n' + '*' * 80 + '\n\n\n')

maxClients = 10

haveCommand = False
for (flag, command, function, inAll, help) in commands:
    if getattr(args, command) or inAll and args.all:
        if function:
            haveCommand = True
            function()
if not haveCommand:
    print('roxeearn.py: Tell me what to do. -a does almost everything. -h shows options.')
