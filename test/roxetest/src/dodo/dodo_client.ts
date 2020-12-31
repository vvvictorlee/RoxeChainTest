// import { DosAbiJson } from "../lib/abijson";
// import { buyram, createNewAccount, deployContract } from "../lib/api_utils";
// import { ClientUtil } from "./client_util";
// // import { Dos, U2G_PAIR_DATA, U2H_PAIR_DATA } from "./client_data";
// import { Dos, U2G_PAIR_DATA, U2H_PAIR_DATA, G2H_PAIR_DATA } from "./client_data_test";
// // import { Dos, U2G_PAIR_DATA, U2H_PAIR_DATA } from "./client_data_prod";
// import { prettyJson } from "../lib/prettyjson";
// const { deployContractjs } = require('../lib/deployContract_api_utils')

// // const jq = require('node-jq');
// const { Api, JsonRpc, Serialize, RpcError } = require('roxejs')
// const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
// const fetch = require('node-fetch')                                   // node only; not needed in browsers
// const { TextEncoder, TextDecoder } = require('util')

// const signatureProvider = new JsSignatureProvider(Dos.keys)
// export const rpc = new JsonRpc('http://172.17.3.161:7878', { fetch })

// const api = new Api({
//     rpc,
//     signatureProvider,
//     textDecoder: new TextDecoder(),
//     textEncoder: new TextEncoder()
// })

import { Dos } from "./client_data_test";
import { prettyJson } from "../lib/prettyjson";
// const { deployContractjs } = require('../lib/deployContract_api_utils')
import { Client } from "../lib/client";
import { ClientUtil } from "../lib/client_util";


// // # http://10.100.1.10:8889/v1/wallet/list_wallets

// const createtoken = async () => await api.transact({
//     actions: [{
//         account: 'usd2gbp33333',
//         name: 'create',
//         authorization: [{
//             actor: 'usd2gbp33333',
//             permission: 'active',
//         }],
//         data: {
//             issuer: 'usd2gbp33333',
//             maximum_supply: '10000000000.000000 GBP'
//         },
//     }]
// }, {
//     blocksBehind: 3,
//     expireSeconds: 30,
// });

// const transactWithConfig = async (actionjson: any) => await api.transact(actionjson, {
//     blocksBehind: 3,
//     expireSeconds: 30,
// });

// const pushTransaction = async (account: any, action: any, data: any) => {
//     let results = {};
//     try {
//         const json = ClientUtil.this.common_client.pushAction(Dos.dosContract, account, Dos.acc2pub_keys[account], action, data);
//         console.log(JSON.stringify(json));
//         results = await transactWithConfig(json);
//     }
//     catch (error) {
//         results = error;
//         console.log(JSON.stringify(error));
//     }

//     return results;
// }

// const this.common_client.pushAction = async (action: any, ...restOfPara: any[]) => {
//     const account = restOfPara[0];
//     const data = await DosAbiJson.buildActionParameterJson(action, ...restOfPara);
//     const results = await pushTransaction(account, action, data);
//     await prettyJson(results);
//     return results;
// }

// const utils = { api: api, Serialize: Serialize };
// const filePath = '../wasms/roxe.token/roxe.token';
// const dodofilePath = '../wasms/1229/eosdos/eosdos';

// ClientUtil.pair_data = { ONE_DECIMALS: Dos.ONE_DECIMALS, TOKEN_CONTRACT: Dos.TOKEN_CONTRACT };

export class DosClient {
    common_client: any;
    pair_data: { [name: string]: any } = {}
    constructor(pair_data: any, para: any) {
        this.pair_data = pair_data;
        this.common_client = new Client(para.client_para);
        ClientUtil.para = para.util_para;
    }

    async newacc() {
        const newusers = [this.pair_data.newaccdata.newuser];//Dos.admin];//
        let result = "";
        for (let newuser of newusers) {
            result += await this.common_client.newacc(newuser);
        }
        return result;
    }

    async deployContract() {
        const contracts = [[Dos.admin, Dos.dosfilePath]];//[Dos.tokenowner, Dos.filePath],
        let result = "";
        for (let contract of contracts) {
            result += await this.common_client.deployContract(contract[0], contract[1]);
        }
        return result;
    }

    async newtoken() {
        const tokens = this.pair_data.tokens;
        for (let t of tokens) {
            await this.common_client.t.pushAction("newtoken", Dos.tokenissuer, ClientUtil.to_max_supply(t));
        }
    }
    async mintx() {
        const users = this.pair_data.mintdata.users;
        const tokens = this.pair_data.tokens;
        for (let u of users) {
            for (let t of tokens) {
                await this.common_client.t.pushAction("mint", u, ClientUtil.to_wei_asset(50000000, t));
            }
        }
    }

    async mint() {
        const users = this.pair_data.mintdata.users;
        const tokens = this.pair_data.mintdata.tokens;
        for (let u of users) {
            for (let t of tokens) {
                await this.common_client.t.pushAction("mint", u, ClientUtil.to_wei_asset(t[0], t[1]));
            }
        }
    }
    async initproxy() {
        await this.common_client.pushAction("init", Dos.admin, Dos.maintainer, ClientUtil.to_sym(this.pair_data.base.tokens[0]), ClientUtil.get_core_symbol());
    }
    async newdodo() {
        const basestr = this.pair_data.base.tokens[0];
        const quotestr = this.pair_data.base.tokens[1];
        const msg_sender = Dos.admin;
        const dodo_name = this.pair_data.base.DODO_NAME;
        const maintainer = Dos.doowner;
        const baseToken = ClientUtil.to_sym(basestr);
        const quoteToken = ClientUtil.to_sym(quotestr);
        const oracle = ClientUtil.to_sym(basestr);
        const lpFeeRate = this.pair_data.lpFeeRate;
        const mtFeeRate = this.pair_data.mtFeeRate;
        const k = this.pair_data.k;
        const gasPriceLimit = 0; // gweiStr("100")
        await this.common_client.pushAction("breeddodo",
            msg_sender, dodo_name, maintainer, baseToken, quoteToken, oracle, lpFeeRate, mtFeeRate, k, gasPriceLimit);
    }
    async enable() {
        const dodo_name = this.pair_data.base.DODO_NAME;
        // await this.common_client.pushAction("enabletradin", Dos.admin, dodo_name);
        // await this.common_client.pushAction("enablequodep", Dos.admin, dodo_name);
        // await this.common_client.pushAction("enablebasdep", Dos.admin, dodo_name);
        await this.common_client.pushAction("setparameter", Dos.admin, dodo_name,"trading",1);
        await this.common_client.pushAction("setparameter", Dos.admin, dodo_name,"quotedeposit",1);
        await this.common_client.pushAction("setparameter", Dos.admin, dodo_name,"basedeposit",1);
    }
    async setprice() {
        await this.common_client.pushAction("setprice", Dos.oracleadmin, ClientUtil.to_sym(this.pair_data.base.tokens[0]), ClientUtil.to_asset(this.pair_data.oracleprice, this.pair_data.base.tokens[1]));
    }

    async setparameter() {
        await this.common_client.pushAction("setparameter", Dos.admin, this.pair_data.base.DODO_NAME, "k", this.pair_data.k);
        await this.common_client.pushAction("setparameter", Dos.admin, this.pair_data.base.DODO_NAME, "lpfeerate", this.pair_data.lpFeeRate);
        await this.common_client.pushAction("setparameter", Dos.admin, this.pair_data.base.DODO_NAME, "mtfeerate", this.pair_data.mtFeeRate);
    }

    async depositbasequote() {
        const dodo_name = this.pair_data.base.DODO_NAME;
        const baseamount = this.pair_data.depositdata.baseamount;
        const quoteamount = this.pair_data.depositdata.quoteamount;
        await this.common_client.pushAction("depositbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(baseamount, this.pair_data.base.tokens[0]));
        await this.common_client.pushAction("depositquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(quoteamount, this.pair_data.base.tokens[1]));
    }

    async buybt() {
        await this.common_client.pushAction("buybasetoken", Dos.trader, this.pair_data.base.DODO_NAME, ClientUtil.to_asset(this.pair_data.buydata.amount, this.pair_data.base.tokens[0]), ClientUtil.to_wei_asset(this.pair_data.buydata.maxPay, this.pair_data.base.tokens[1]));
    }
    async sellbt() {
        await this.common_client.pushAction("sellbastoken", Dos.trader, this.pair_data.base.DODO_NAME, ClientUtil.to_asset(this.pair_data.selldata.amount, this.pair_data.base.tokens[0]), ClientUtil.to_asset(this.pair_data.selldata.minReceive, this.pair_data.base.tokens[1]));
    }

    async buyfakebt() {
        const a = { quantity: "1.000000 XXX", contract: "a" };
        await this.common_client.pushAction("buybasetoken", Dos.trader, this.pair_data.base.DODO_NAME, a, ClientUtil.to_wei_asset(this.pair_data.buydata.maxPay, this.pair_data.base.tokens[1]));
    }
    // async buydecbt() {
    //     await this.common_client.pushAction("buybasetoken", Dos.trader, this.pair_data.base.DODO_NAME, ClientUtil.to_wei_asset(10000000, this.pair_data.base.tokens[0]), ClientUtil.to_wei_asset(this.pair_data.buydata.maxPay, this.pair_data.base.tokens[1]));
    // }

    async extransfer() {
        const users = [Dos.admin];
        const tokens = ["USD", "GBP", "HKD"];
        for (let u of users) {
            for (let t of tokens) {
                await this.common_client.pushAction("mint", u, ClientUtil.to_wei_asset(20000, t));
            }
        }

        {
            const users = ["114listvtuib"];
            // const tokens = ["USD", "GBP", "HKD"];
            for (let u of users) {
                for (let t of tokens) {
                    let results: any = await this.common_client.pushAction("extransfer",
                        Dos.admin,
                        u,
                        ClientUtil.to_wei_asset(20000, t),
                        "");
                }
            }
        }

    }

}

// var argumentss: any = process.argv.splice(2);
// // console.log(__line); 
// // console.log('所传递的参数是：', argumentss);

// // //////////////////////////
// // // print process.argv
// // process.argv.forEach(function (val, index, array) {
// //     // console.log(__line); 
// //     console.log(index + ': ' + val);
// // });

// let client = new DosClient(U2G_PAIR_DATA.pairpara);
// // let client = new DosClient(U2H_PAIR_DATA.pairpara);

// const handlers: any = {
//     "a": (async function () {
//         await client.allowDosContracts();
//     }),
//     "t": (async function () {
//         await client.extransfer();
//     }),
//     "newacc": (async function () {
//         await client.newacc();
//     }),
//     "newtokenacc": (async function () {
//         await client.newtokenacc();
//     }),
//     "newdodoacc": (async function () {
//         await client.newdodoacc();
//     }),
//     "deploy": (async function () {
//         await client.deploy();
//     }),
//     "deploytoken": (async function () {
//         await client.deploytoken();
//     }),
//     "deploydodo": (async function () {
//         await client.deploydodo(Dos.testadmin);
//         // await client.deploydodo(Dos.prodadmin);
//     }),
//     "newtoken": (async function () {
//         await client.newtoken();
//     }),
//     "mint": (async function () {
//         await client.mint();
//     }),
//     "newdodo": (async function () {
//         await client.newdodo();
//     }),
//     "enable": (async function () {
//         await client.enable();
//     }),
//     "setprice": (async function () {
//         await client.setprice();
//     }),
//     "setparameter": (async function () {
//         await client.setparameter();
//     }),
//     "setkparameter": (async function () {
//         await client.setkparameter();
//     }),
//     "g2hwithdrawbase": (async function () {
//         await client.g2hwithdrawbase();
//     }),
//     "u2gwithdrawquote": (async function () {
//         await client.u2gwithdrawquote();
//     }),
//     "depositbasequote": (async function () {
//         await client.depositbasequote();
//     }),
//     "buybt": (async function () {
//         await client.buybt();
//     }),
//     "sellbt": (async function () {
//         await client.sellbt();
//     }),
//     "buyfakebt": (async function () {
//         await client.buyfakebt();
//     }),
//     "buydecbt": (async function () {
//         await client.buydecbt();
//     }),
//     "initproxy": (async function () {
//         await client.initproxy();
//     }),
//     "buy": (async function () {
//         const base.tokens[0] = "";
//         const base.tokens[1] = "";
//         await this.common_client.pushAction("buyethtoken", Dos.trader, ClientUtil.to_wei_asset(1, base.tokens[0]), ClientUtil.to_wei_asset(200, "MKR"));
//         await this.common_client.pushAction("sellethtoken", Dos.trader, ClientUtil.to_wei_asset(1, base.tokens[0]), ClientUtil.to_wei_asset(50, "MKR"));
//         await this.common_client.pushAction("withdraweab", Dos.lp, ClientUtil.to_wei_asset(5, base.tokens[0]), ClientUtil.to_sym("MKR"));
//         await this.common_client.pushAction("withdrawaeab", Dos.lp, ClientUtil.to_sym("MKR"));
//         await this.common_client.pushAction("buytokeneth", Dos.trader, ClientUtil.to_wei_asset(200, "MKR"), ClientUtil.to_asset(21000, base.tokens[0]));
//         await this.common_client.pushAction("selltokeneth", Dos.trader, ClientUtil.to_wei_asset(50, "MKR"), ClientUtil.to_asset(4500, base.tokens[0]));
//         await this.common_client.pushAction("withdraweaq", Dos.lp, ClientUtil.to_wei_asset(5, base.tokens[0]), ClientUtil.to_sym("MKR"));
//         await this.common_client.pushAction("withdrawaeaq", Dos.lp, ClientUtil.to_sym("MKR"));
//         await this.common_client.pushAction("buybasetoken", Dos.trader, ClientUtil.to_wei_asset(1000, base.tokens[1]), ClientUtil.to_wei_asset(1001, "MKR"));
//         await this.common_client.pushAction("sellbastoken", Dos.trader, ClientUtil.to_wei_asset(8990, base.tokens[1]), ClientUtil.to_wei_asset(10000, "MKR"));
//     }),
//     "default": (async function () {
//         // await client.mintx();
//         // await client.setpricex();
//         // await client.depositbasequotex();
//         console.log(ClientUtil.todecimal((1000)), "test option", ClientUtil.todecimal(1000));
//     })

// };

// // "newacc", "deploy",
// // const actions = ["a", "newtoken", "mint", "newdodo", "enable", "setprice", "depositbasequote", "buybt", "sellbt"];

// // "newacc", "deploy","a", "newtoken", "mint", "newdodo","enable", "setprice",
// const actions = ["setkparameter"];//, "depositbasequote", "buybt", "sellbt"/, "sellbt"

// // const actions = ["u2gwithdrawquote"];//, "depositbasequote", "buybt", "sellbt"

// const batchhandlers: any = {
//     "u2g": (async function () {
//         client = new DosClient(U2G_PAIR_DATA.pairpara);
//         for (let ac of actions) {
//             await handlers[ac]();
//         }
//     }),
//     "u2h": (async function () {
//         client = new DosClient(U2H_PAIR_DATA.pairpara);
//         for (let ac of actions) {
//             await handlers[ac]();
//         }
//     }),
//     "g2h": (async function () {
//         client = new DosClient(G2H_PAIR_DATA.pairpara);
//         for (let ac of actions) {
//             await handlers[ac]();
//         }
//     }),
//     "default": (async function () {
//         const f = handlers[argumentss[0]] || handlers["default"];
//         f();
//     })
// };

// const f = batchhandlers[argumentss[0]] || batchhandlers["default"];
// f();


// createtoken();


