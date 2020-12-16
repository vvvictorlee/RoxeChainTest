import { DosAbiJson } from "../lib/abijson";
import { buyram, createNewAccount, deployContract } from "../lib/api_utils";
import { ClientUtil } from "./client_util";
// import { Dos, U2G_PAIR_DATA, U2H_PAIR_DATA } from "./client_data";
import { Dos, U2G_PAIR_DATA, U2H_PAIR_DATA, G2H_PAIR_DATA } from "./client_data_test";
// import { Dos, U2G_PAIR_DATA, U2H_PAIR_DATA } from "./client_data_prod";
import { prettyJson } from "../lib/prettyjson";
const { deployContractjs } = require('../lib/deployContract_api_utils')

// const jq = require('node-jq');
const { Api, JsonRpc, Serialize, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const signatureProvider = new JsSignatureProvider(Dos.keys)
const rpc = new JsonRpc('http://172.17.3.161:8888', { fetch })

const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
})

// # http://10.100.1.10:8889/v1/wallet/list_wallets

const createtoken = async () => await api.transact({
    actions: [{
        account: 'usd2gbp33333',
        name: 'create',
        authorization: [{
            actor: 'usd2gbp33333',
            permission: 'active',
        }],
        data: {
            issuer: 'usd2gbp33333',
            maximum_supply: '10000000000.000000 GBP'
        },
    }]
}, {
    blocksBehind: 3,
    expireSeconds: 30,
});

const transactWithConfig = async (actionjson: any) => await api.transact(actionjson, {
    blocksBehind: 3,
    expireSeconds: 30,
});

const pushTransaction = async (account: any, action: any, data: any) => {
    let results = {};
    try {
        const json = ClientUtil.pushAction(Dos.dosContract, account, Dos.acc2pub_keys[account], action, data);
        console.log(JSON.stringify(json));
        results = await transactWithConfig(json);
    }
    catch (error) {
        results = error;
        console.log(JSON.stringify(error));
    }

    return results;
}

const pushAction = async (action: any, ...restOfPara: any[]) => {
    const account = restOfPara[0];
    const data = await DosAbiJson.buildActionParameterJson(action, ...restOfPara);
    const results = await pushTransaction(account, action, data);
    await prettyJson(results);
    return results;
}

const utils = { api: api, Serialize: Serialize };
const filePath = '../wasms/roxe.token/roxe.token';
const dodofilePath = '../wasms/eosdos/eosdos';

ClientUtil.para = { ONE_DECIMALS: Dos.ONE_DECIMALS, TOKEN_CONTRACT: Dos.TOKEN_CONTRACT };

export class DosClient {
    para: { [name: string]: any } = {}
    constructor(para: any) {
        this.para = para;
        prettyJson(this.para);
    }

    async allowDosContract(user: any, pubk: any) {
        try {
            const json = ClientUtil.allowContract(user, pubk, Dos.dosContract);
            console.log(JSON.stringify(json));
            const results = await transactWithConfig(json);
            await prettyJson(results);
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    }
    async allowDosContracts() {
        const newuser = this.para.newaccdata.newuser;
        const pub_key = this.para.newaccdata.pub_key;
        this.allowDosContract(newuser, pub_key);
        const accounts = Object.keys(Dos.acc2pub_keys);
        for (let acc of accounts) {
            this.allowDosContract(acc, Dos.acc2pub_keys[acc]);
        }
    }
    async newacc() {
        const newuser = this.para.newaccdata.newuser;
        const pub_key = this.para.newaccdata.pub_key;
        // const pub_key = Dos.acc2pub_keys[this.para.newuser];
        createNewAccount(newuser, pub_key, pub_key, api);

    }
    async newdodoacc() {
        const users = [Dos.testadmin, Dos.prodadmin];//Dos.admin,
        for (let u of users) {
            const newuser = u;
            // const pub_key = this.para.newaccdata.pub_key;
            const pub_key = Dos.acc2pub_keys[newuser];
            createNewAccount(newuser, pub_key, pub_key, api);
        }
    }

    async newtokenacc() {
        const newuser = Dos.tokenowner;
        // const pub_key = this.para.newaccdata.pub_key;
        const pub_key = Dos.acc2pub_keys[newuser];
        createNewAccount(newuser, pub_key, pub_key, api);

    }
    async deploy() {
        deployContractjs(this.para.currentDodo, filePath, utils);
    }
    async deploytoken() {
        deployContractjs(Dos.tokenowner, filePath, utils);
    }
    async deploydodo(sc_acc: any) {
        deployContractjs(sc_acc, dodofilePath, utils);
    }

    async newtoken() {
        await pushAction("newtoken", Dos.tokenissuer, ClientUtil.to_max_supply(this.para.currentbasestr));
        await pushAction("newtoken", Dos.tokenissuer, ClientUtil.to_max_supply(this.para.currentquotestr));
    }
    async mint() {
        const users = this.para.mintdata.users;
        const tokens = this.para.mintdata.tokens;
        for (let u of users) {
            for (let t of tokens) {
                await pushAction("mint", u, ClientUtil.to_wei_asset(t[0], t[1]));
            }
        }
    }

    async mintx() {
        let mintdata = {
            users: [Dos.lp, Dos.trader],
            tokens: [[7000000, U2H_PAIR_DATA.PAIR.quote]]
        };
        const users = mintdata.users;
        const tokens = mintdata.tokens;
        for (let u of users) {
            for (let t of tokens) {
                await pushAction("mint", u, ClientUtil.to_wei_asset(t[0], t[1]));
            }
        }
    }

    async initproxy() {
        await pushAction("init", Dos.admin, Dos.maintainer, ClientUtil.to_sym(this.para.currentbasestr), ClientUtil.get_core_symbol());
    }
    async newdodo() {
        const basestr = this.para.currentbasestr;
        const quotestr = this.para.currentquotestr;
        const msg_sender = Dos.admin;
        const dodo_name = this.para.currentDodo;
        const maintainer = Dos.doowner;
        const baseToken = ClientUtil.to_sym(basestr);
        const quoteToken = ClientUtil.to_sym(quotestr);
        const oracle = ClientUtil.to_sym(basestr);
        const lpFeeRate = this.para.lpFeeRate;
        const mtFeeRate = this.para.mtFeeRate;
        const k = this.para.k;
        const gasPriceLimit = 0; // gweiStr("100")
        await pushAction("breeddodo",
            msg_sender, dodo_name, maintainer, baseToken, quoteToken, oracle, lpFeeRate, mtFeeRate, k, gasPriceLimit);
    }
    async enable() {
        const dodo_name = this.para.currentDodo;
        await pushAction("enabletradin", Dos.admin, dodo_name);
        await pushAction("enablequodep", Dos.admin, dodo_name);
        await pushAction("enablebasdep", Dos.admin, dodo_name);
        // await pushAction("setparameter", Dos.admin, dodo_name,"trading",1);
        // await pushAction("setparameter", Dos.admin, dodo_name,"quotedeposit",1);
        // await pushAction("setparameter", Dos.admin, dodo_name,"basedeposit",1);
    }
    async setprice() {
        await pushAction("setprice", Dos.admin, ClientUtil.to_sym(this.para.currentbasestr), ClientUtil.to_asset(this.para.oracleprice, this.para.currentquotestr));
    }

    async setpricex() {
        await pushAction("setprice", Dos.admin, ClientUtil.to_sym(this.para.currentbasestr), ClientUtil.to_asset(77500, this.para.currentquotestr));
    }
    async setparameter() {
        await pushAction("setparameter", Dos.admin, this.para.currentDodo, "k", this.para.k);
        await pushAction("setparameter", Dos.admin, this.para.currentDodo, "lpfeerate", this.para.lpFeeRate);
        await pushAction("setparameter", Dos.admin, this.para.currentDodo, "mtfeerate", this.para.mtFeeRate);
    }
    async depositbasequote() {
        const dodo_name = this.para.currentDodo;
        const baseamount = this.para.depositdata.baseamount;
        const quoteamount = this.para.depositdata.quoteamount;
        await pushAction("depositbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(baseamount, this.para.currentbasestr));
        await pushAction("depositquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(quoteamount, this.para.currentquotestr));
    }
    async g2hwithdrawbase() {
        const dodo_name = this.para.currentDodo;
        const baseamount = this.para.depositdata.baseamount;
        const quoteamount = this.para.depositdata.quoteamount;
        await pushAction("withdrawbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(baseamount, this.para.currentbasestr));
        // await pushAction("depositquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(quoteamount, this.para.currentquotestr));
    }
    async u2gwithdrawquote() {
        const dodo_name = this.para.currentDodo;
        const baseamount = this.para.depositdata.baseamount;
        const quoteamount = this.para.depositdata.quoteamount;
        // await pushAction("withdrawbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(baseamount, this.para.currentbasestr));
        await pushAction("withdrawquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(quoteamount, this.para.currentquotestr));
    }
    async depositbasequotex() {
        const dodo_name = this.para.currentDodo;
        const quoteamount = 7000000;
        await pushAction("depositquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(quoteamount, this.para.currentquotestr));
    }
    async buybt() {
        await pushAction("buybasetoken", Dos.trader, this.para.currentDodo, ClientUtil.to_wei_asset(this.para.buydata.amount, this.para.currentbasestr), ClientUtil.to_wei_asset(this.para.buydata.maxPay, this.para.currentquotestr));
    }
    async buyfakebt() {
        const a = { quantity: "1.000000 XXX", contract: "a" };
        await pushAction("buybasetoken", Dos.trader, this.para.currentDodo, a, ClientUtil.to_wei_asset(this.para.buydata.maxPay, this.para.currentquotestr));
    }
    async buydecbt() {
        await pushAction("buybasetoken", Dos.trader, this.para.currentDodo, ClientUtil.to_dec_asset(10000000, this.para.currentbasestr), ClientUtil.to_wei_asset(this.para.buydata.maxPay, this.para.currentquotestr));
    }
    async sellbt() {
        await pushAction("sellbastoken", Dos.trader, this.para.currentDodo, ClientUtil.to_wei_asset(this.para.selldata.amount, this.para.currentbasestr), ClientUtil.to_wei_asset(this.para.selldata.minReceive, this.para.currentquotestr));
    }
    async extransfer() {
        const users = [Dos.admin];
        const tokens = ["USD", "GBP", "HKD"];
        for (let u of users) {
            for (let t of tokens) {
                await pushAction("mint", u, ClientUtil.to_wei_asset(20000, t));
            }
        }

        {
            const users = ["114listvtuib"];
            // const tokens = ["USD", "GBP", "HKD"];
            for (let u of users) {
                for (let t of tokens) {
                    let results: any = await pushAction("extransfer",
                        Dos.admin,
                        u,
                        ClientUtil.to_wei_asset(20000, t),
                        "");
                }
            }
        }

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

let client = new DosClient(U2G_PAIR_DATA.pairpara);
// let client = new DosClient(U2H_PAIR_DATA.pairpara);

const handlers: any = {
    "a": (async function () {
        await client.allowDosContracts();
    }),
    "t": (async function () {
        await client.extransfer();
    }),
    "newacc": (async function () {
        await client.newacc();
    }),
    "newtokenacc": (async function () {
        await client.newtokenacc();
    }),
    "newdodoacc": (async function () {
        await client.newdodoacc();
    }),
    "deploy": (async function () {
        await client.deploy();
    }),
    "deploytoken": (async function () {
        await client.deploytoken();
    }),
    "deploydodo": (async function () {
        await client.deploydodo(Dos.testadmin);
        await client.deploydodo(Dos.prodadmin);
    }),
    "newtoken": (async function () {
        await client.newtoken();
    }),
    "mint": (async function () {
        await client.mint();
    }),
    "newdodo": (async function () {
        await client.newdodo();
    }),
    "enable": (async function () {
        await client.enable();
    }),
    "setprice": (async function () {
        await client.setprice();
    }),
    "setparameter": (async function () {
        await client.setparameter();
    }),
    "g2hwithdrawbase": (async function () {
        await client.g2hwithdrawbase();
    }),
    "u2gwithdrawquote": (async function () {
        await client.u2gwithdrawquote();
    }),
    "depositbasequote": (async function () {
        await client.depositbasequote();
    }),
    "buybt": (async function () {
        await client.buybt();
    }),
    "sellbt": (async function () {
        await client.sellbt();
    }),
    "buyfakebt": (async function () {
        await client.buyfakebt();
    }),
    "buydecbt": (async function () {
        await client.buydecbt();
    }),
    "initproxy": (async function () {
        await client.initproxy();
    }),
    "buy": (async function () {
        const currentbasestr = "";
        const currentquotestr = "";
        await pushAction("buyethtoken", Dos.trader, ClientUtil.to_wei_asset(1, currentbasestr), ClientUtil.to_wei_asset(200, "MKR"));
        await pushAction("sellethtoken", Dos.trader, ClientUtil.to_wei_asset(1, currentbasestr), ClientUtil.to_wei_asset(50, "MKR"));
        await pushAction("withdraweab", Dos.lp, ClientUtil.to_wei_asset(5, currentbasestr), ClientUtil.to_sym("MKR"));
        await pushAction("withdrawaeab", Dos.lp, ClientUtil.to_sym("MKR"));
        await pushAction("buytokeneth", Dos.trader, ClientUtil.to_wei_asset(200, "MKR"), ClientUtil.to_asset(21000, currentbasestr));
        await pushAction("selltokeneth", Dos.trader, ClientUtil.to_wei_asset(50, "MKR"), ClientUtil.to_asset(4500, currentbasestr));
        await pushAction("withdraweaq", Dos.lp, ClientUtil.to_wei_asset(5, currentbasestr), ClientUtil.to_sym("MKR"));
        await pushAction("withdrawaeaq", Dos.lp, ClientUtil.to_sym("MKR"));
        await pushAction("buybasetoken", Dos.trader, ClientUtil.to_wei_asset(1000, currentquotestr), ClientUtil.to_wei_asset(1001, "MKR"));
        await pushAction("sellbastoken", Dos.trader, ClientUtil.to_wei_asset(8990, currentquotestr), ClientUtil.to_wei_asset(10000, "MKR"));
    }),
    "default": (async function () {
        // await client.mintx();
        // await client.setpricex();
        // await client.depositbasequotex();
        console.log(ClientUtil.todecimal((1000)), "test option", ClientUtil.todecimal(1000));
    })

};

// "newacc", "deploy",
// const actions = ["a", "newtoken", "mint", "newdodo", "enable", "setprice", "depositbasequote", "buybt", "sellbt"];

// "newacc", "deploy","a", "newtoken", "mint", "newdodo","enable", "setprice",
const actions = ["buybt", "sellbt"];//, "depositbasequote", "buybt", "sellbt"

// const actions = ["u2gwithdrawquote"];//, "depositbasequote", "buybt", "sellbt"

const batchhandlers: any = {
    "u2g": (async function () {
        client = new DosClient(U2G_PAIR_DATA.pairpara);
        for (let ac of actions) {
            await handlers[ac]();
        }
    }),
    "u2h": (async function () {
        client = new DosClient(U2H_PAIR_DATA.pairpara);
        for (let ac of actions) {
            await handlers[ac]();
        }
    }),
    "g2h": (async function () {
        client = new DosClient(G2H_PAIR_DATA.pairpara);
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


// createtoken();
