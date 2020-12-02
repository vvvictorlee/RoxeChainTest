import { SwapAbiJson } from "../lib/abijson";
import { buyram, createNewAccount, deployContract } from "../lib/api_utils";
import { ClientUtil } from "./client_util";
import { Swap } from "./client_data";
import { prettyJson } from "../lib/prettyjson";

// const jq = require('node-jq');
const { Api, JsonRpc, Serialize, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const signatureProvider = new JsSignatureProvider(Swap.keys)
const rpc = new JsonRpc('http://172.17.3.161:8888', { fetch })

const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
})

// # http://10.100.1.10:8889/v1/wallet/list_wallets



const transactWithConfig = async (actionjson: any) => {
    const results = await api.transact(actionjson, {
        blocksBehind: 3,
        expireSeconds: 30,
    });
    // const blockInfo = await rpc.get_block(results.processed.block_num - 3);
    // console.log(blockInfo);
    return results;
};

const pushTransaction = async (account: any, action: any, data: any) => {
    const json = ClientUtil.pushAction(Swap.swapContract, account, Swap.acc2pub_keys[account], action, data);
    await prettyJson(json);
    const results = await transactWithConfig(json);
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
        let results: any = await pushAciton("extransfer",
            Swap.admin,
            "1114wmpblocm",
            ClientUtil.to_wei_asset(2000, "BTC"),
            "");
        results = await pushAciton("extransfer",
            Swap.admin,
            "1114wmpblocm",
            ClientUtil.to_wei_asset(2000, "USDT"),
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
const tokenuser = "";
const newuser = "";
const filePath = '../wasms/roxe.token/roxe.token'
const currPool = "btc2usdt";
const token1 = "BTC";
const token2 = "USDT";
const utils = { api: api, Serialize: Serialize };
const client = new SwapClient(currPool);
const handlers: any = {
    "t": (async function () {
        await client.extransfer();
    }),
    "newacc": (async function () {
        const pub_key = Swap.acc2pub_keys[newuser];
        createNewAccount(newuser, pub_key, pub_key, api);
    }),
    "deploy": (async function () {
        deployContract(tokenuser, filePath, utils);
    }),
    "a": (async function () {
        client.allowSwapContracts();
    }),
    "n": (async function () {
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply(token1));
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply(token2));
    }),
    "m": (async function () {///Swap.admin, Swap.nonadmin, Swap.user1, "112acnogsedo",
        const users = ["112acnogsedo","1114wmpblocm"];
        const tokens = [token1, token2];
        for (let u of users) {
            for (let t of tokens) {
                await pushAciton("mint", u, ClientUtil.to_wei_asset(5000000, t));
            }
        }
    }),
    "p": (async function () {
        await pushAciton("newpool", Swap.admin, currPool);
    }),
    "cp": (async function () {
        await pushAciton("cppool2table", Swap.admin, currPool);
    }),
    "s": (async function () {
        await pushAciton("setswapfee", Swap.admin, currPool, 1000);
        await pushAciton("setpubswap", Swap.admin, currPool, true);
    }),
    "b": (async function () {
        await pushAciton("bind", Swap.admin, currPool, ClientUtil.to_wei_asset(5, token1), ClientUtil.to_wei(5));
        await pushAciton("bind", Swap.admin, currPool, ClientUtil.to_wei_asset(200, token2), ClientUtil.to_wei(5));
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
            ClientUtil.to_asset(2500000, token1),
            ClientUtil.to_wei_asset(4, token2),
            ClientUtil.to_wei(200));
    }),
    "o": (async function () {
        await pushAciton("swapamtout", Swap.user1, currPool,
            ClientUtil.to_wei_asset(4000, token2),
            ClientUtil.to_wei_asset(1, token1),
            ClientUtil.to_wei(500));
    }),
    "oo": (async function () {
        await pushAciton("swapamtout", Swap.user1, currPool,
            ClientUtil.to_asset(5000000000, token2),
            ClientUtil.to_asset(10000, token1),
            ClientUtil.to_wei(500000));
    }),
    "e": (async function () {
        await client.extransfer();
    }),
    "B": (async function () {
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply(token1));
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply(token2));
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply("MKR"));
        await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply("XXX"));


        await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(50, token1));
        await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(200, "MKR"));
        await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(10000, token2));
        await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(10, "XXX"));

        await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(25, token1));
        await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(4, "MKR"));
        await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(40000, token2));
        await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(10, "XXX"));

        await pushAciton("newpool", Swap.admin, currPool);

        await pushAciton("setpubswap", Swap.admin, currPool, true);
        await pushAciton("setswapfee", Swap.admin, currPool, 1000);

        await pushAciton("bind", Swap.admin, currPool, ClientUtil.to_wei_asset(50, token1), ClientUtil.to_wei(5));
        await pushAciton("bind", Swap.admin, currPool, ClientUtil.to_wei_asset(20, "MKR"), ClientUtil.to_wei(5));
        await pushAciton("bind", Swap.admin, currPool, ClientUtil.to_wei_asset(10000, token2), ClientUtil.to_wei(5));

        await pushAciton("finalize", Swap.admin, currPool);

        await pushAciton("joinpool", Swap.user1, currPool, ClientUtil.to_wei(10), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    }),
    "default": (async function () {
        // console.log(__line); console.log("test option");
        await prettyJson(ClientUtil.to_wei_asset(200, token2));
    })

};

// console.log(__line);console.log(process.argv);
const f = handlers[argumentss[0]] || handlers["default"];
f();
