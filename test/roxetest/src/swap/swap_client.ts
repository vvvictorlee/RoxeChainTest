import { SwapAbiJson } from "../lib/abijson";
import { buyram, createNewAccount, deployContract } from "../lib/api_utils";
import { ClientUtil } from "./client_util";
import { Swap, BTC2USD_PAIR_DATA,ETH2USD_PAIR_DATA } from "./client_data";
import { prettyJson } from "../lib/prettyjson";
const { deployContractjs } = require('../lib/deployContract_api_utils')

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
    let results = {};
    try {
        const json = ClientUtil.pushAction(Swap.swapContract, account, Swap.acc2pub_keys[account], action, data);
        await prettyJson(json);
        results = await transactWithConfig(json);
    }
    catch (error) {
        console.log(JSON.stringify(error));
        results = error;
    }

    return results;
}

const pushAciton = async (action: any, ...restOfPara: any[]) => {
    const account = restOfPara[0];
    const data = await SwapAbiJson.buildActionParameterJson(action, ...restOfPara);
    const results = await pushTransaction(account, action, data);
    await prettyJson(results);
    return results;
}

const filePath = '../wasms/roxe.token/roxe.token';
const swapfilePath = '../wasms/eoswap/eoswap';

class SwapClient {
    para: { [name: string]: any } = {}
    constructor(para: any) {
        this.para = para;
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
    async cppool2table() {
        await pushAciton("cppool2table", Swap.admin, this.para.currentPool);
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

    async newacc() {
        const newuser = this.para.newaccdata.newuser;
        const pub_key = Swap.acc2pub_keys[newuser];
        createNewAccount(newuser, pub_key, pub_key, api);
    }

    async newswapacc() {
        const newuser = Swap.admin;
        const pub_key = Swap.acc2pub_keys[newuser];
        createNewAccount(newuser, pub_key, pub_key, api);
    }

    async deployContract() {
        deployContractjs(Swap.tokenowner, filePath, utils);
    }

    async deploySwapContract() {
        deployContractjs(Swap.admin, swapfilePath, utils);
    }

    async newtoken() {
        await pushAciton("newtoken", Swap.tokenissuer, ClientUtil.to_max_supply(this.para.token1));
        await pushAciton("newtoken", Swap.tokenissuer, ClientUtil.to_max_supply(this.para.token2));
    }
    async mintx() {///Swap.admin, Swap.nonadmin, Swap.user1, "112acnogsedo",
        const users = this.para.mintdata.users;//[Swap.admin, "112acnogsedo", "1114wmpblocm"];
        const tokens = [this.para.token1, this.para.token2];
        for (let u of users) {
            for (let t of tokens) {
                await pushAciton("mint", u, ClientUtil.to_wei_asset(50000000, t));
            }
        }
    }
    async mint() {
        const users = this.para.mintdata.users;//[Swap.admin, "112acnogsedo", "1114wmpblocm"];
        const tokens = this.para.mintdata.tokens;
        for (let u of users) {
            for (let t of tokens) {
                await pushAciton("mint", u, ClientUtil.to_wei_asset(t[0], t[1]));
            }
        }
    }
    async newpool() {
        await pushAciton("newpool", Swap.admin, this.para.currentPool);
    }
   async newtestpool() {
        await pushAciton("newpool", Swap.admin, "testpool");
    }
    async setswapfee() {
        await pushAciton("setswapfee", Swap.admin, this.para.currentPool, this.para.swapfee);
        await pushAciton("setpubswap", Swap.admin, this.para.currentPool, this.para.pubswap);
    }
    async bind() {
        await pushAciton("bind", Swap.admin, this.para.currentPool, ClientUtil.to_wei_asset(this.para.binddata.token1.amount, this.para.token1), ClientUtil.to_wei(this.para.binddata.token1.denorm));
        await pushAciton("bind", Swap.admin, this.para.currentPool, ClientUtil.to_wei_asset(this.para.binddata.token2.amount, this.para.token2), ClientUtil.to_wei(this.para.binddata.token1.denorm));
    }
    async finalize() {
        await pushAciton("finalize", Swap.admin, this.para.currentPool);
    }
    async joinpool() {
        await pushAciton("joinpool", Swap.nonadmin, this.para.currentPool, ClientUtil.to_wei(this.para.joinpooldata), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    }
    async exitpool() {
        await pushAciton("exitpool", Swap.nonadmin, this.para.currentPool, ClientUtil.to_wei(this.para.exitpooldata), [0, 0]);
    }
    async collect() {
        await pushAciton("collect", Swap.admin, this.para.currentPool);
    }
    async swapamtin() {
        await pushAciton("swapamtin", this.para.swapindata.user, this.para.currentPool,
            ClientUtil.to_asset(this.para.swapindata.tokenAmountIn, this.para.token1),
            ClientUtil.to_asset(this.para.swapindata.minAmountOut, this.para.token2),
            ClientUtil.to_wei(this.para.swapindata.maxPrice));
    }
    async swapamtout() {
        await pushAciton("swapamtout", this.para.swapoutdata.user, this.para.currentPool,
            ClientUtil.to_asset(this.para.swapoutdata.maxAmountIn, this.para.token2),
            ClientUtil.to_asset(this.para.swapoutdata.tokenAmountOut, this.para.token1),
            ClientUtil.to_wei(this.para.swapoutdata.maxPrice));
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

const utils = { api: api, Serialize: Serialize };
let client = new SwapClient(BTC2USD_PAIR_DATA.pairpara);

const handlers: any = {
   "newtestpool": (async function () {
        await client.newtestpool();
    }),
    "t": (async function () {
        await client.extransfer();
    }),
    "newacc": (async function () {
        await client.newacc();
    }),
    "newswapacc": (async function () {
        await client.newswapacc();
    }),
    "deploy": (async function () {
        await client.deployContract();
    }),
    "deployswap": (async function () {
        await client.deploySwapContract();
    }),
    "a": (async function () {
        await client.allowSwapContracts();
    }),
    "newtoken": (async function () {
        await client.newtoken();
    }),
    "mint": (async function () {
        await client.mint();
    }),
    "newpool": (async function () {
        await client.newpool();
    }),
    "cppool2table": (async function () {
        await client.cppool2table();
    }),
    "setswapfee": (async function () {
        await client.setswapfee();
    }),
    "bind": (async function () {
        await client.bind();
    }),
    "finalize": (async function () {
        await client.finalize();
    }),
    "joinpool": (async function () {
        await client.joinpool();
    }),
    "exitpool": (async function () {
        await client.exitpool();
    }),
    "collect": (async function () {
        await client.collect();
    }),
    "swapamtin": (async function () {
        await client.swapamtin();
    }),
    "swapamtout": (async function () {
        await client.swapamtout();
    }),
    // "oo": (async function () {
    //     await pushAciton("swapamtout", Swap.user1, this.para.currentPool,
    //         ClientUtil.to_asset(5000000000, token2),
    //         ClientUtil.to_asset(10000, token1),
    //         ClientUtil.to_wei(500000));
    // }),
    // "B": (async function () {
    //     await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply(token1));
    //     await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply(token2));
    //     await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply("MKR"));
    //     await pushAciton("newtoken", Swap.admin, ClientUtil.to_max_supply("XXX"));


    //     await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(50, token1));
    //     await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(200, "MKR"));
    //     await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(10000, token2));
    //     await pushAciton("mint", Swap.admin, ClientUtil.to_wei_asset(10, "XXX"));

    //     await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(25, token1));
    //     await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(4, "MKR"));
    //     await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(40000, token2));
    //     await pushAciton("mint", Swap.user1, ClientUtil.to_wei_asset(10, "XXX"));

    //     await pushAciton("newpool", Swap.admin, this.para.currentPool);

    //     await pushAciton("setpubswap", Swap.admin, this.para.currentPool, true);
    //     await pushAciton("setswapfee", Swap.admin, this.para.currentPool, 1000);

    //     await pushAciton("bind", Swap.admin, this.para.currentPool, ClientUtil.to_wei_asset(50, token1), ClientUtil.to_wei(5));
    //     await pushAciton("bind", Swap.admin, this.para.currentPool, ClientUtil.to_wei_asset(20, "MKR"), ClientUtil.to_wei(5));
    //     await pushAciton("bind", Swap.admin, this.para.currentPool, ClientUtil.to_wei_asset(10000, token2), ClientUtil.to_wei(5));

    //     await pushAciton("finalize", Swap.admin, this.para.currentPool);

    //     await pushAciton("joinpool", Swap.user1, this.para.currentPool, ClientUtil.to_wei(10), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    // }),
    "default": (async function () {
        // console.log(__line); console.log("test option");
        await prettyJson(ClientUtil.to_wei_asset(200, "BTC"));
    })

};

// "newacc", "deploy","exitpool","collect"
// const actions = ["a", "newtoken", "mint", "newpool", "setswapfee", "bind", "finalize", "joinpool", "swapamtin","swapamtout"];

const actions = ["newacc","newpool"];


const batchhandlers: any = {
    "b2u": (async function () {
        client = new SwapClient(BTC2USD_PAIR_DATA.pairpara);
        for (let ac of actions) {
            await handlers[ac]();
        }
    }),
    "e2u": (async function () {
        client = new SwapClient(ETH2USD_PAIR_DATA.pairpara);
        for (let ac of actions) {
            await handlers[ac]();
        }
    }),
    "default": (async function () {
        const f = handlers[argumentss[0]] || handlers["default"];
        f();
    })
};

const f = batchhandlers[argumentss[0]] || batchhandlers["default"];
f();
