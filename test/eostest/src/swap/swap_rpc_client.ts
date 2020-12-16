
//const axios = require('axios');
const request = require('request');
let sleep = require('sleep');
// var request = require('request'); // https://www.npmjs.com/package/request
let async = require('async'); // https://www.npmjs.com/package/async
// const { logTime } = require("./log_aop");
import { SwapAbiJson } from "../lib/abijson";
// const jq = require('node-jq');
const EOS_RPC = require('../lib/eos_rpc')
const eosrpc = EOS_RPC();

const prettyJson = async (log: any) => {
    // let jsonstr = await jq.run('.', JSON.stringify(log), { input: 'string', output: 'pretty' });
    console.log(JSON.stringify(log));
};

// # http://10.100.1.10:8889/v1/wallet/list_wallets

import { ClientUtil } from "./client_util";
import { Swap } from "./client_data";

const pushTransaction = async (account: any, action: any, data: any) => {
    const results = await eosrpc.transaction(ClientUtil.pushAction(Swap.swapContract, account, Swap.acc2pub_keys[account], action, data));
    return results;
}

const pushAction = async (action: any, ...restOfPara: any[]) => {
    const account = restOfPara[0];
    console.log("account===", account);
    const data = await SwapAbiJson.buildActionParameterJson(action, ...restOfPara);
    const results = await pushTransaction(account, action, data);
    await prettyJson(results);
    return results;
}


class SwapClient {
    poolName: string;
    constructor(pool_name: string) {
        this.poolName = pool_name;
    }
    async allowSwapContract(user: any, pubk: any) {
        await eosrpc.transaction(ClientUtil.allowContract(user, pubk, Swap.swapContract));
    }

    async allowSwapContracts() {
        const accounts = Object.keys(Swap.acc2pub_keys);
        for (let acc of accounts) {
            this.allowSwapContract(acc, Swap.acc2pub_keys[acc]);
        }
    }

    async create_wallet() {
        const results = await eosrpc.create_default_wallet();

        // console.log(__line); prettyJson(results);
    }

    async import_keys() {
        const results = await eosrpc.import_keys(Swap.keys);
        // console.log(__line); prettyJson(results);
    }

    async extransfer() {
        const results = await pushAction("extransfer", Swap.admin,
            Swap.admin,
            Swap.nonadmin,
            ClientUtil.to_core_asset(10000, "ROC"),
            "");
    }

}

var argumentss: any = process.argv.splice(2);
// console.log(__line); 
console.log('所传递的参数是：', argumentss);

//////////////////////////
// print process.argv
process.argv.forEach(function (val, index, array) {
    // console.log(__line); 
    console.log(index + ': ' + val);
});

const client = new SwapClient(Swap.pool4);

const handlers: any = {
    "cr": (async function () {
        await client.create_wallet();
    }),
    "im": (async function () {
        await client.import_keys();
    }),
    "a": (async function () {
        client.allowSwapContracts();
    }),
    "n": (async function () {
        await pushAction("newtoken", Swap.admin, ClientUtil.to_max_supply("WETH"));
        await pushAction("newtoken", Swap.admin, ClientUtil.to_max_supply("DAI"));
    }),
    "m": (async function () {
        await pushAction("mint", Swap.admin, ClientUtil.to_wei_asset(500, "WETH"));
        await pushAction("mint", Swap.admin, ClientUtil.to_wei_asset(200, "DAI"));
        await pushAction("mint", Swap.nonadmin, ClientUtil.to_wei_asset(100, "WETH"));
        await pushAction("mint", Swap.nonadmin, ClientUtil.to_wei_asset(200, "DAI"));
        await pushAction("mint", Swap.user1, ClientUtil.to_wei_asset(1000, "WETH"));
        await pushAction("mint", Swap.user1, ClientUtil.to_wei_asset(200, "DAI"));
    }),
    "p": (async function () {
        await pushAction("newpool", Swap.admin, Swap.pool4);
        await pushAction("newpool", Swap.admin, Swap.pool3);
    }),
    "p2": (async function () {
        await pushAction("newpool", Swap.admin, Swap.pool4);
    }),
    "s": (async function () {
        await pushAction("setswapfee", Swap.admin, Swap.pool4, 1000);
        await pushAction("setpubswap", Swap.admin, Swap.pool4, true);
    }),
    "b": (async function () {
        await pushAction("bind", Swap.admin, Swap.pool4, ClientUtil.to_wei_asset(5, "WETH"), ClientUtil.to_wei(5));
        await pushAction("bind", Swap.admin, Swap.pool4, ClientUtil.to_wei_asset(200, "DAI"), ClientUtil.to_wei(5));
    }),
    "f": (async function () {
        await pushAction("finalize", Swap.admin, Swap.pool4);
    }),
    "j": (async function () {
        await pushAction("joinpool", Swap.nonadmin, Swap.pool4, ClientUtil.to_wei(10), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    }),
    "x": (async function () {
        await pushAction("exitpool", Swap.nonadmin, Swap.pool4, ClientUtil.to_wei(10), [0, 0]);
    }),
    "c": (async function () {
        await pushAction("collect", Swap.admin, Swap.pool4);
    }),
    "i": (async function () {
        await pushAction("swapamtin", Swap.user1, Swap.pool4,
            ClientUtil.to_asset(250, "WETH"),
            ClientUtil.to_wei_asset(4, "DAI"),
            ClientUtil.to_wei(200));
    }),
    "o": (async function () {
        await pushAction("swapamtout", Swap.user1, Swap.pool4,
            ClientUtil.to_wei_asset(3, "WETH"),
            ClientUtil.to_wei_asset(1, "DAI"),
            ClientUtil.to_wei(500));
    }),
    "e": (async function () {
        await client.extransfer();
    }),
    "B": (async function () {
        await pushAction("newtoken", Swap.admin, ClientUtil.to_max_supply("WETH"));
        await pushAction("newtoken", Swap.admin, ClientUtil.to_max_supply("DAI"));
        await pushAction("newtoken", Swap.admin, ClientUtil.to_max_supply("MKR"));
        await pushAction("newtoken", Swap.admin, ClientUtil.to_max_supply("XXX"));


        await pushAction("mint", Swap.admin, ClientUtil.to_wei_asset(50, "WETH"));
        await pushAction("mint", Swap.admin, ClientUtil.to_wei_asset(200, "MKR"));
        await pushAction("mint", Swap.admin, ClientUtil.to_wei_asset(10000, "DAI"));
        await pushAction("mint", Swap.admin, ClientUtil.to_wei_asset(10, "XXX"));

        await pushAction("mint", Swap.user1, ClientUtil.to_wei_asset(25, "WETH"));
        await pushAction("mint", Swap.user1, ClientUtil.to_wei_asset(4, "MKR"));
        await pushAction("mint", Swap.user1, ClientUtil.to_wei_asset(40000, "DAI"));
        await pushAction("mint", Swap.user1, ClientUtil.to_wei_asset(10, "XXX"));

        await pushAction("newpool", Swap.admin, Swap.pool3);

        await pushAction("setpubswap", Swap.admin, Swap.pool3, true);
        await pushAction("setswapfee", Swap.admin, Swap.pool3, 1000);

        await pushAction("bind", Swap.admin, Swap.pool3, ClientUtil.to_wei_asset(50, "WETH"), ClientUtil.to_wei(5));
        await pushAction("bind", Swap.admin, Swap.pool3, ClientUtil.to_wei_asset(20, "MKR"), ClientUtil.to_wei(5));
        await pushAction("bind", Swap.admin, Swap.pool3, ClientUtil.to_wei_asset(10000, "DAI"), ClientUtil.to_wei(5));

        await pushAction("finalize", Swap.admin, Swap.pool3);

        await pushAction("joinpool", Swap.user1, Swap.pool3, ClientUtil.to_wei(10), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    }),
    "default": (async function () {
        // console.log(__line); console.log("test option");
        await prettyJson(ClientUtil.to_wei_asset(200, "DAI"));
    })

};

// console.log(__line);console.log(process.argv);
const f = handlers[argumentss[0]] || handlers["default"];
f();
