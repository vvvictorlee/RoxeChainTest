import { SwapAbiJson } from "../lib/abijson";
// const jq = require('node-jq');
const { Api, JsonRpc, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')
const defaultPrivateKey = "5KS2QMfShmDjHaLAZEPJgehVXAobgo5YfVw1mzPBHaPpGfKbkZL";
import { ClientUtil } from "./client_util";
import { Swap } from "./client_data";

const signatureProvider = new JsSignatureProvider(Swap.keys)
const rpc = new JsonRpc('http://47.91.226.192:7878', { fetch })

const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
})


const prettyJson = async (log: any) => {
    // let jsonstr = await jq.run('.', JSON.stringify(log), { input: 'string', output: 'pretty' });
    console.log(JSON.stringify(log));
};

// # http://10.100.1.10:8889/v1/wallet/list_wallets



const transactWithConfig = async (actionjson: any) => {
    const results = await api.transact(actionjson, {
        blocksBehind: 3,
        expireSeconds: 30,
    });
    const blockInfo = await rpc.get_block(results.processed.block_num - 3);
    // console.log(blockInfo);
    return results;
};

const pushTransaction = async (account: any, action: any, data: any) => {
    const results = await transactWithConfig(ClientUtil.pushAction(Swap.swapContract, account, Swap.acc2pub_keys[account], action, data));
    return results;
}

const pushAciton = async (action: any, ...restOfPara: any[]) => {
    const account = restOfPara[0];
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
        const results = await transactWithConfig(ClientUtil.allowContract(user, pubk, Swap.swapContract));
        await prettyJson(results);
    }

    async allowSwapContracts() {
        const accounts = Object.keys(Swap.acc2pub_keys);
        for (let acc of accounts) {
            this.allowSwapContract(acc, Swap.acc2pub_keys[acc]);
        }
    }

    async extransfer() {
        const results = await pushAciton("extransfer",
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

const currPool = Swap.pool4;
const client = new SwapClient(currPool);
const handlers: any = {
    "a": (async function () {
        client.allowSwapContracts();
    }),
    "n": (async function () {
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply("WETH"));
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply("DAI"));
    }),
    "m": (async function () {
        await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(500, "WETH"));
        await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(200, "DAI"));
        await pushAciton("mint", Swap.nonadmin, ClientUtil.to_wei_asset(100, "WETH"));
        await pushAciton("mint", Swap.nonadmin, ClientUtil.to_wei_asset(200, "DAI"));
        await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(1000, "WETH"));
        await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(200, "DAI"));
    }),
    "p": (async function () {
        await pushAciton("newpool", Swap.admin, currPool);
    }),
    "s": (async function () {
        await pushAciton("setswapfee", Swap.admin, currPool, 1000);
        await pushAciton("setpubswap", Swap.admin, currPool, true);
    }),
    "b": (async function () {
        await pushAciton("bind", Swap.admin, currPool, ClientUtil.to_wei_asset(5, "WETH"), ClientUtil.to_wei(5));
        await pushAciton("bind", Swap.admin, currPool, ClientUtil.to_wei_asset(200, "DAI"), ClientUtil.to_wei(5));
    }),
    "f": (async function () {
        await pushAciton("finalize", Swap.admin, currPool);
    }),
    "j": (async function () {
        await pushAciton("joinpool", Swap.nonadmin, currPool, ClientUtil.to_wei(10), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    }),
    "x": (async function () {
        await pushAciton("exitpool", Swap.nonadmin, currPool, ClientUtil.to_wei(10), [0, 0]);
    }),
    "c": (async function () {
        await pushAciton("collect", Swap.admin, currPool);
    }),
    "i": (async function () {
        await pushAciton("swapamtin", Swap.user1, currPool,
            ClientUtil.to_asset(250, "WETH"),
            ClientUtil.to_wei_asset(4, "DAI"),
            ClientUtil.to_wei(200));
    }),
    "o": (async function () {
        await pushAciton("swapamtout", Swap.user1, currPool,
            ClientUtil.to_wei_asset(3, "WETH"),
            ClientUtil.to_wei_asset(1, "DAI"),
            ClientUtil.to_wei(500));
    }),
    "e": (async function () {
        await client.extransfer();
    }),
    "B": (async function () {
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply("WETH"));
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply("DAI"));
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply("MKR"));
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply("XXX"));


        await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(50, "WETH"));
        await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(200, "MKR"));
        await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(10000, "DAI"));
        await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(10, "XXX"));

        await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(25, "WETH"));
        await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(4, "MKR"));
        await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(40000, "DAI"));
        await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(10, "XXX"));

        await pushAciton("newpool", Swap.admin, currPool);

        await pushAciton("setpubswap", Swap.admin, currPool, true);
        await pushAciton("setswapfee", Swap.admin, currPool, 1000);

        await pushAciton("bind", Swap.admin, currPool, ClientUtil.to_wei_asset(50, "WETH"), ClientUtil.to_wei(5));
        await pushAciton("bind", Swap.admin, currPool, ClientUtil.to_wei_asset(20, "MKR"), ClientUtil.to_wei(5));
        await pushAciton("bind", Swap.admin, currPool, ClientUtil.to_wei_asset(10000, "DAI"), ClientUtil.to_wei(5));

        await pushAciton("finalize", Swap.admin, currPool);

        await pushAciton("joinpool", Swap.user1, currPool, ClientUtil.to_wei(10), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    }),
    "default": (async function () {
        // console.log(__line); console.log("test option");
        await prettyJson(ClientUtil.to_wei_asset(200, "DAI"));
    })

};

// console.log(__line);console.log(process.argv);
const f = handlers[argumentss[0]] || handlers["default"];
f();
