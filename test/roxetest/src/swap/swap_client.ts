// import { SwapAbiJson } from "../lib/abijson";
// import { buyram, createNewAccount, deployContract } from "../lib/api_utils";
// import { ClientUtil } from "../lib/client_util";
// import { TxUtil } from "../lib/tx_util";
// import { Swap, BTC2USD_PAIR_DATA,ETH2USD_PAIR_DATA } from "./client_data";
import { Swap } from "./client_data_test";
import { prettyJson } from "../lib/prettyjson";
// const { deployContractjs } = require('../lib/deployContract_api_utils')
import { Client } from "../lib/client";
import { ClientUtil } from "../lib/client_util";

// // const jq = require('node-jq');
// const { Api, JsonRpc, Serialize, RpcError } = require('roxejs')
// const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
// const fetch = require('node-fetch')                                   // node only; not needed in browsers
// const { TextEncoder, TextDecoder } = require('util')

// const signatureProvider = new JsSignatureProvider(Swap.keys)
// const rpc = new JsonRpc('http://172.17.3.161:8888', { fetch })

// const api = new Api({
//     rpc,
//     signatureProvider,
//     textDecoder: new TextDecoder(),
//     textEncoder: new TextEncoder()
// })

// // # http://10.100.1.10:8889/v1/wallet/list_wallets



// const transactWithConfig = async (actionjson: any) => {
//     const results = await api.transact(actionjson, {
//         blocksBehind: 3,
//         expireSeconds: 30,
//     });
//     // const blockInfo = await rpc.get_block(results.processed.block_num - 3);
//     // console.log(blockInfo);
//     return results;
// };

// const pushTransaction = async (account: any, action: any, data: any) => {
//     let results = {};
//     try {
//         const json = Util.pushAction(Swap.swapContract, account, Swap.acc2pub_keys[account], action, data);
//         await prettyJson(json);
//         results = await transactWithConfig(json);
//     }
//     catch (error) {
//         console.log(JSON.stringify(error));
//         results = error;
//     }

//     return results;
// }

// const pushAction = async (action: any, ...restOfPara: any[]) => {
//     const account = restOfPara[0];
//     const data = await SwapAbiJson.buildActionParameterJson(action, ...restOfPara);
//     const results = await pushTransaction(account, action, data);
//     await prettyJson(results);
//     return results;
// }


export class SwapClient {
    common_client: any;
    pair_data: { [name: string]: any } = {}
    constructor(pair_data: any, para: any) {
        this.pair_data = pair_data;
        this.common_client = new Client(para.client_para);
        ClientUtil.para = para.util_para;
    }
    // async allowSwapContract(user: any, pubk: any) {
    //     const results = await transactWithConfig(TxUtil.allowContract(user, pubk, Swap.swapContract));
    //     await prettyJson(results);
    // }

    // async allowSwapContracts() {
    //     const accounts = Object.keys(Swap.acc2pub_keys);
    //     for (let acc of accounts) {
    //         this.allowSwapContract(acc, Swap.acc2pub_keys[acc]);
    //     }
    // }

    async cppool2table() {
        await this.common_client.pushAction("cppool2table", Swap.admin, this.pair_data.currentPool);
    }
    async extransfer() {
        let results: any = await this.common_client.pushAction("extransfer",
            Swap.admin,
            "1114wmpblocm",
            ClientUtil.to_wei_asset(2000, "BTC"),
            "");
        results = await this.common_client.pushAction("extransfer",
            Swap.admin,
            "1114wmpblocm",
            ClientUtil.to_wei_asset(2000, "USDT"),
            "");
    }

    async newacc() {
        const newusers = [this.pair_data.newaccdata.newuser];//Swap.admin];//
        let result = "";
        for (let newuser of newusers) {
            result += await this.common_client.newacc(newuser);
        }
        return result;
    }

    async deployContract() {
        const contracts = [[Swap.admin, Swap.swapfilePath]];//[Swap.tokenowner, Swap.filePath],
        let result = "";
        for (let contract of contracts) {
            result += await this.common_client.deployContract(contract[0], contract[1]);
        }
        return result;
    }

    async newtoken() {
        const tokens = this.pair_data.tokens;
        for (let t of tokens) {
            await this.common_client.pushAction("newtoken", Swap.tokenissuer, ClientUtil.to_max_supply(t));
        }
    }
    async mintx() {///Swap.admin, Swap.nonadmin, Swap.user1, "112acnogsedo",
        const users = this.pair_data.mintdata.users;//[Swap.admin, "112acnogsedo", "1114wmpblocm"];
        const tokens = this.pair_data.tokens;
        for (let u of users) {
            for (let t of tokens) {
                await this.common_client.pushAction("mint", u, ClientUtil.to_wei_asset(50000000, t));
            }
        }
    }

    async mint() {
        const users = this.pair_data.mintdata.users;//[Swap.admin, "112acnogsedo", "1114wmpblocm"];
        const tokens = this.pair_data.mintdata.tokens;
        for (let u of users) {
            for (let t of tokens) {
                await this.common_client.pushAction("mint", u, ClientUtil.to_wei_asset(t[0], t[1]));
            }
        }
    }
    async newpool() {
        await this.common_client.pushAction("newpool", Swap.admin, this.pair_data.currentPool);
    }
    async newtestpool(poolName: any) {
        await this.common_client.pushAction("newpool", Swap.admin, poolName);
    }
    async setswapfee() {
        await this.common_client.pushAction("setswapfee", Swap.admin, this.pair_data.currentPool, this.pair_data.swapfee);
        await this.common_client.pushAction("setpubswap", Swap.admin, this.pair_data.currentPool, this.pair_data.pubswap);
    }
    async bind() {
        const user = Swap.admin;
        const pool = this.pair_data.currentPool;
        const tokens = this.pair_data.binddata;
        for (let t of tokens) {
            await this.common_client.pushAction("bind", user, pool, ClientUtil.to_wei_asset(t[0], t[1]), ClientUtil.to_wei(t[2]));
        }
        // await pushAction("bind", Swap.admin, this.pair_data.currentPool, ClientUtil.to_wei_asset(this.pair_data.binddata.token2.amount, this.pair_data.token2), ClientUtil.to_wei(this.pair_data.binddata.token1.denorm));
    }

    async finalize() {
        await this.common_client.pushAction("finalize", Swap.admin, this.pair_data.currentPool);
    }
    async joinpool() {
        await this.common_client.pushAction("joinpool", Swap.nonadmin, this.pair_data.currentPool, ClientUtil.to_wei(this.pair_data.joinpooldata), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    }
    async exitpool() {
        await this.common_client.pushAction("exitpool", Swap.nonadmin, this.pair_data.currentPool, ClientUtil.to_wei(this.pair_data.exitpooldata), [0, 0]);
    }
    async collect() {
        await this.common_client.pushAction("collect", Swap.admin, this.pair_data.currentPool);
    }
    async swapamtin() {
        await this.common_client.pushAction("swapamtin", this.pair_data.swapindata.user, this.pair_data.currentPool,
            ClientUtil.to_asset(this.pair_data.swapindata.tokenAmountIn, this.pair_data.tokens[0]),
            ClientUtil.to_asset(this.pair_data.swapindata.minAmountOut, this.pair_data.tokens[1]),
            ClientUtil.to_wei(this.pair_data.swapindata.maxPrice));
    }

    async swapamtout() {
        await this.common_client.pushAction("swapamtout", this.pair_data.swapoutdata.user, this.pair_data.currentPool,
            ClientUtil.to_asset(this.pair_data.swapoutdata.maxAmountIn, this.pair_data.tokens[1]),
            ClientUtil.to_asset(this.pair_data.swapoutdata.tokenAmountOut, this.pair_data.tokens[0]),
            ClientUtil.to_wei(this.pair_data.swapoutdata.maxPrice));
    }

}

// var argumentss: any = process.argv.splice(2);
// // console.log(__line); 
// console.log('所传递的参数是：', argumentss);

// //////////////////////////
// // print process.argv
// process.argv.forEach(function (val, index, array) {
//     // console.log(__line); 
//     console.log(index + ': ' + val);
// });

// let client = new SwapClient(Swap.BTC2USD_PAIR_DATA, Swap.para);

// const handlers: any = {
//     "newtestpool": (async function () {
//         await client.newtestpool("");
//     }),
//     "t": (async function () {
//         await client.extransfer();
//     }),
//     "newacc": (async function () {
//         await client.newacc();
//     }),
//     "deploy": (async function () {
//         await client.deployContract();
//     }),
//     "a": (async function () {
//         await client.common_client.allowContracts();
//     }),
//     "newtoken": (async function () {
//         await client.newtoken();
//     }),
//     "mint": (async function () {
//         await client.mint();
//     }),
//     "newpool": (async function () {
//         await client.newpool();
//     }),
//     "cppool2table": (async function () {
//         await client.cppool2table();
//     }),
//     "setswapfee": (async function () {
//         await client.setswapfee();
//     }),
//     "bind": (async function () {
//         await client.bind();
//     }),
//     "finalize": (async function () {
//         await client.finalize();
//     }),
//     "joinpool": (async function () {
//         await client.joinpool();
//     }),
//     "exitpool": (async function () {
//         await client.exitpool();
//     }),
//     "collect": (async function () {
//         await client.collect();
//     }),
//     "swapamtin": (async function () {
//         await client.swapamtin();
//     }),
//     "swapamtout": (async function () {
//         await client.swapamtout();
//     }),
//     "default": (async function () {
//         // console.log(__line); console.log("test option");
//         await prettyJson(ClientUtil.to_wei_asset(200, "BTC"));
//     })

// };

// // "newacc", "deploy","exitpool","collect"
// // const actions = ["a", "newtoken", "mint", "newpool", "setswapfee", "bind", "finalize", "joinpool", "swapamtin","swapamtout"];

// const actions = ["newacc", "newpool"];


// const batchhandlers: any = {
//     "b2u": (async function () {
//         client = new SwapClient(Swap.BTC2USD_PAIR_DATA, Swap.para);
//         for (let ac of actions) {
//             await handlers[ac]();
//         }
//     }),
//     "default": (async function () {
//         // const f = handlers[argumentss[0]] || handlers["default"];
//         // f();
//     })
// };

// const f = batchhandlers[argumentss[0]] || batchhandlers["default"];
// f();
