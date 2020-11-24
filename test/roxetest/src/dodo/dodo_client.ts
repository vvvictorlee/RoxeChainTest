import { DosAbiJson } from "../lib/abijson";
// const jq = require('node-jq');
const { Api, JsonRpc, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')
import { ClientUtil } from "./client_util";
import { Dos } from "./client_data";

const signatureProvider = new JsSignatureProvider(Dos.keys)
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


const transactWithConfig = async (actionjson: any) => await api.transact(actionjson, {
    blocksBehind: 3,
    expireSeconds: 30,
});

const pushTransaction = async (account: any, action: any, data: any) => {
    const json = ClientUtil.pushAction(Dos.dosContract, account, Dos.acc2pub_keys[account], action, data);
    console.log(JSON.stringify(json));
    const results = await transactWithConfig(json);
    return results;
}

const pushAciton = async (action: any, ...restOfPara: any[]) => {
    const account = restOfPara[0];
    const data = await DosAbiJson.buildActionParameterJson(action, ...restOfPara);
    const results = await pushTransaction(account, action, data);
    await prettyJson(results);
    return results;
}

class DosClient {
    poolName: string;
    constructor(pool_name: string) {
        this.poolName = pool_name;
    }
    async allowDosContract(user: any, pubk: any) {
        const json = ClientUtil.allowContract(user, pubk, Dos.dosContract);
        console.log(JSON.stringify(json));
        const results = await transactWithConfig(json);
        await prettyJson(results);
    }

    async allowDosContracts() {
        const accounts = Object.keys(Dos.acc2pub_keys);
        for (let acc of accounts) {
            this.allowDosContract(acc, Dos.acc2pub_keys[acc]);
        }
    }

    async extransfer() {
        const results = await pushAciton("extransfer",
            Dos.bp,
            Dos.lp,
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

const client = new DosClient(Dos.dodo_stablecoin_name);


let handlers: any = {
    "t": (async function () {
        await client.extransfer();
    }),
    "ip": (async function () {
        await pushAciton("init", Dos.admin, Dos.maintainer, ClientUtil.to_sym("WETH"), ClientUtil.get_core_symbol());
    }),
    "n": (async function () {
        await pushAciton("newtoken", Dos.tokenissuer, ClientUtil.to_max_supply("WETH"));
        await pushAciton("newtoken", Dos.tokenissuer, ClientUtil.to_max_supply("DAI"));
        await pushAciton("newtoken", Dos.tokenissuer, ClientUtil.to_max_supply("MKR"));

    }),
    "m": (async function () {
        await pushAciton("mint", Dos.lp, ClientUtil.to_wei_asset(1000, "MKR"));
        await pushAciton("mint", Dos.trader, ClientUtil.to_wei_asset(1000, "MKR"));
    }),
    "ms": (async function () {
        await pushAciton("mint", Dos.lp, ClientUtil.to_wei_asset(10000, "WETH"));
        await pushAciton("mint", Dos.trader, ClientUtil.to_wei_asset(10000, "WETH"));
        await pushAciton("mint", Dos.lp, ClientUtil.to_wei_asset(10000, "DAI"));
        await pushAciton("mint", Dos.trader, ClientUtil.to_wei_asset(10000, "DAI"));
        await pushAciton("mint", Dos.lp, ClientUtil.to_wei_asset(10000, "MKR"));
        await pushAciton("mint", Dos.trader, ClientUtil.to_wei_asset(10000, "MKR"));
    }),
    "o": (async function () {
        await pushAciton("neworacle", Dos.oracleadmin, ClientUtil.to_sym("WETH"));
        await pushAciton("neworacle", Dos.oracleadmin, ClientUtil.to_sym("DAI"));
        await pushAciton("neworacle", Dos.oracleadmin, ClientUtil.to_sym("MKR"));
    }),
    "sp": (async function () {
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_sym("WETH"), ClientUtil.to_wei_asset(1, "DAI"));
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_sym("MKR"), ClientUtil.to_wei_asset(1, "DAI"));
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_sym("DAI"), ClientUtil.to_wei_asset(1, "MKR"));
    }),
    "spa": (async function () {
        await pushAciton("setparameter", Dos.admin, Dos.dodo_stablecoin_name, "k", 100);
        await pushAciton("setparameter", Dos.admin, Dos.dodo_stablecoin_name, "lpfeerate", 2);
        await pushAciton("setparameter", Dos.admin, Dos.dodo_stablecoin_name, "mtfeerate", 3);
    }),
    "b": (async function () {
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_wei_asset(100, "WETH"));
        const msg_sender = Dos.admin;
        const dodo_name = Dos.dodo_ethbase_name;
        const maintainer = Dos.doowner;
        const baseToken = ClientUtil.to_sym("WETH");
        const quoteToken = ClientUtil.to_sym("MKR");
        const oracle = ClientUtil.to_sym("WETH");
        const lpFeeRate = 2;
        const mtFeeRate = 1;
        const k = 1;
        const gasPriceLimit = 0; // gweiStr("100")
        await pushAciton("breeddodo",
            msg_sender, dodo_name, Dos.maintainer, baseToken, quoteToken, oracle, lpFeeRate, mtFeeRate, k, gasPriceLimit);
        await pushAciton("enabletradin", Dos.admin, dodo_name);
        await pushAciton("enablequodep", Dos.admin, dodo_name);
        await pushAciton("enablebasdep", Dos.admin, dodo_name);
        await pushAciton("depositquote", Dos.lp, Dos.dodo_ethbase_name, ClientUtil.to_wei_asset(1000, "MKR"));
        await pushAciton("depositethab", Dos.lp, ClientUtil.to_wei_asset(10, "WETH"), ClientUtil.to_sym("MKR"));

    }),
    "q": (async function () {
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_asset(100, "MKR"));

        const msg_sender = Dos.admin;
        const dodo_name = Dos.dodo_ethquote_name;
        const maintainer = Dos.doowner;
        const baseToken = ClientUtil.to_sym("WETH");
        const quoteToken = ClientUtil.to_sym("MKR");
        const oracle = ClientUtil.to_sym("MKR");
        const lpFeeRate = 2;
        const mtFeeRate = 1;
        const k = 1;
        const gasPriceLimit = 0; // gweiStr("100")
        await pushAciton("breeddodo",
            msg_sender, dodo_name, maintainer, quoteToken, baseToken, oracle, lpFeeRate, mtFeeRate, k, gasPriceLimit);
        await pushAciton("enabletradin", Dos.admin, dodo_name);
        await pushAciton("enablequodep", Dos.admin, dodo_name);
        await pushAciton("enablebasdep", Dos.admin, dodo_name);
        await pushAciton("depositbase", Dos.lp, Dos.dodo_ethquote_name, ClientUtil.to_wei_asset(1000, "MKR"));
        await pushAciton("depositethaq", Dos.lp, ClientUtil.to_wei_asset(10, "WETH"), ClientUtil.to_sym("MKR"));
    }),
    "s": (async function () {
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_sym("DAI"), ClientUtil.to_wei_asset(1, "MKR"));
        const msg_sender = Dos.admin;
        const dodo_name = Dos.dodo_stablecoin_name;
        const maintainer = Dos.doowner;
        const baseToken = ClientUtil.to_sym("DAI");
        const quoteToken = ClientUtil.to_sym("MKR");
        const oracle = ClientUtil.to_sym("DAI");
        const lpFeeRate = 1;
        const mtFeeRate = 0;
        const k = 1;
        const gasPriceLimit = 0; // gweiStr("100")
        await pushAciton("breeddodo",
            msg_sender, dodo_name, maintainer, baseToken, quoteToken, oracle, lpFeeRate, mtFeeRate, k, gasPriceLimit);
        await pushAciton("enabletradin", Dos.admin, dodo_name);
        await pushAciton("enablequodep", Dos.admin, dodo_name);
        await pushAciton("enablebasdep", Dos.admin, dodo_name);
        await pushAciton("depositbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(10000, "DAI"));
        await pushAciton("depositquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(10000, "MKR"));
    }),
    "ss": (async function () {
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_sym("WETH"), ClientUtil.to_wei_asset(1, "DAI"));
        const msg_sender = Dos.admin;
        const dodo_name = Dos.dodo_stablecoin_name;
        const maintainer = Dos.doowner;
        const baseToken = ClientUtil.to_sym("WETH");
        const quoteToken = ClientUtil.to_sym("DAI");
        const oracle = ClientUtil.to_sym("WETH");
        const lpFeeRate = 1;
        const mtFeeRate = 0;
        const k = 1;
        const gasPriceLimit = 0; // gweiStr("100")
        await pushAciton("breeddodo",
            msg_sender, dodo_name, maintainer, baseToken, quoteToken, oracle, lpFeeRate, mtFeeRate, k, gasPriceLimit);
        await pushAciton("enabletradin", Dos.admin, dodo_name);
        await pushAciton("enablequodep", Dos.admin, dodo_name);
        await pushAciton("enablebasdep", Dos.admin, dodo_name);
        await pushAciton("depositbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(10000, "WETH"));
        await pushAciton("depositquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(10000, "DAI"));
    }),
    // # roUSD - roGBP 的池子： 100万美金  75万英镑
    // # roUSD - roHKD的池子： 100万美金  775万港币
    "nn": (async function () {
        await pushAciton("newtoken", Dos.tokenissuer, ClientUtil.to_max_supply("ROUSD"));
        await pushAciton("newtoken", Dos.tokenissuer, ClientUtil.to_max_supply("ROGBP"));
        await pushAciton("newtoken", Dos.tokenissuer, ClientUtil.to_max_supply("ROHKD"));
        await pushAciton("mint", Dos.lp, ClientUtil.to_wei_asset(2000000, "ROUSD"));
        await pushAciton("mint", Dos.trader, ClientUtil.to_wei_asset(2000000, "ROUSD"));
        await pushAciton("mint", Dos.lp, ClientUtil.to_wei_asset(750000, "ROGBP"));
        await pushAciton("mint", Dos.trader, ClientUtil.to_wei_asset(750000, "ROGBP"));
        await pushAciton("mint", Dos.lp, ClientUtil.to_wei_asset(7750000, "ROHKD"));
        await pushAciton("mint", Dos.trader, ClientUtil.to_wei_asset(7750000, "ROHKD"));
    }),
    "spu2h": (async function () {
        const basestr = "ROUSD";
        const quotestr = "ROHKD";
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_sym(basestr), ClientUtil.to_asset(75000, quotestr)); 
    }),
    "spu2g": (async function () {
        const basestr = "ROUSD";
        const quotestr = "ROGBP";
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_sym(basestr), ClientUtil.to_asset(7500, quotestr));
    }),
    "u2g": (async function () {
        const basestr = "ROUSD";
        const quotestr = "ROGBP";
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_sym(basestr), ClientUtil.to_asset(7500, quotestr));
        const msg_sender = Dos.admin;
        const dodo_name = Dos.dodo_u2g_name;
        const maintainer = Dos.doowner;
        const baseToken = ClientUtil.to_sym(basestr);
        const quoteToken = ClientUtil.to_sym(quotestr);
        const oracle = ClientUtil.to_sym(basestr);
        const lpFeeRate = 1;
        const mtFeeRate = 0;
        const k = 1;
        const gasPriceLimit = 0; // gweiStr("100")
        await pushAciton("breeddodo",
            msg_sender, dodo_name, maintainer, baseToken, quoteToken, oracle, lpFeeRate, mtFeeRate, k, gasPriceLimit);
        await pushAciton("enabletradin", Dos.admin, dodo_name);
        await pushAciton("enablequodep", Dos.admin, dodo_name);
        await pushAciton("enablebasdep", Dos.admin, dodo_name);
        await pushAciton("depositbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(1000000, basestr));
        await pushAciton("depositquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(750000, quotestr));
    }),
    "u2h": (async function () {
        const basestr = "ROUSD";
        const quotestr = "ROHKD";
        await pushAciton("setprice", Dos.oracleadmin, ClientUtil.to_sym(basestr), ClientUtil.to_asset(75000, quotestr));
        const msg_sender = Dos.admin;
        const dodo_name = Dos.dodo_u2h_name;
        const maintainer = Dos.doowner;
        const baseToken = ClientUtil.to_sym(basestr);
        const quoteToken = ClientUtil.to_sym(quotestr);
        const oracle = ClientUtil.to_sym(basestr);
        const lpFeeRate = 1;
        const mtFeeRate = 0;
        const k = 1;
        const gasPriceLimit = 0; // gweiStr("100")
        await pushAciton("breeddodo",
            msg_sender, dodo_name, maintainer, baseToken, quoteToken, oracle, lpFeeRate, mtFeeRate, k, gasPriceLimit);
        await pushAciton("enabletradin", Dos.admin, dodo_name);
        await pushAciton("enablequodep", Dos.admin, dodo_name);
        await pushAciton("enablebasdep", Dos.admin, dodo_name);
        await pushAciton("depositbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(1000000, basestr));
        await pushAciton("depositquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(7750000, quotestr));
    }),
    "scw": (async function () {
        const dodo_name = Dos.dodo_stablecoin_name;
        await pushAciton("withdrawbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(10000, "DAI"));
        await pushAciton("withdrawquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(10000, "MKR"));
    }),
    "scwa": (async function () {
        const dodo_name = Dos.dodo_stablecoin_name;
        await pushAciton("withdrawallb", Dos.lp, dodo_name);
        await pushAciton("withdrawallq", Dos.lp, dodo_name);
    }),
    "buy": (async function () {
        await pushAciton("buyethtoken", Dos.trader, ClientUtil.to_wei_asset(1, "WETH"), ClientUtil.to_wei_asset(200, "MKR"));
        await pushAciton("sellethtoken", Dos.trader, ClientUtil.to_wei_asset(1, "WETH"), ClientUtil.to_wei_asset(50, "MKR"));
        await pushAciton("withdraweab", Dos.lp, ClientUtil.to_wei_asset(5, "WETH"), ClientUtil.to_sym("MKR"));
        await pushAciton("withdrawaeab", Dos.lp, ClientUtil.to_sym("MKR"));
        await pushAciton("buytokeneth", Dos.trader, ClientUtil.to_wei_asset(200, "MKR"), ClientUtil.to_asset(21000, "WETH"));
        await pushAciton("selltokeneth", Dos.trader, ClientUtil.to_wei_asset(50, "MKR"), ClientUtil.to_asset(4500, "WETH"));
        await pushAciton("withdraweaq", Dos.lp, ClientUtil.to_wei_asset(5, "WETH"), ClientUtil.to_sym("MKR"));
        await pushAciton("withdrawaeaq", Dos.lp, ClientUtil.to_sym("MKR"));
        await pushAciton("buybasetoken", Dos.trader, ClientUtil.to_wei_asset(1000, "DAI"), ClientUtil.to_wei_asset(1001, "MKR"));
        await pushAciton("sellbastoken", Dos.trader, ClientUtil.to_wei_asset(8990, "DAI"), ClientUtil.to_wei_asset(10000, "MKR"));
    }),
    "a": (async function () {
        await client.allowDosContracts();
    }),
    "scd": (async function () {
        const dodo_name = Dos.dodo_stablecoin_name;
        await pushAciton("depositbase", Dos.lp, dodo_name, ClientUtil.to_wei_asset(10000, "WETH"));
        await pushAciton("depositquote", Dos.lp, dodo_name, ClientUtil.to_wei_asset(10000, "DAI"));
    }),
    "bbt": (async function () {
        await pushAciton("buybasetoken", Dos.trader, Dos.dodo_stablecoin_name, ClientUtil.to_wei_asset(1, "WETH"), ClientUtil.to_wei_asset(1001, "DAI"));
    }),
    "sbt": (async function () {
        await pushAciton("sellbastoken", Dos.trader, Dos.dodo_stablecoin_name, ClientUtil.to_wei_asset(8, "WETH"), ClientUtil.to_wei_asset(9, "DAI"));
    }),
    "bu2g": (async function () {
        await pushAciton("buybasetoken", Dos.trader, Dos.dodo_u2g_name, ClientUtil.to_wei_asset(1, "ROUSD"), ClientUtil.to_wei_asset(1001, "ROGBP"));
    }),
    "su2g": (async function () {
        await pushAciton("sellbastoken", Dos.trader, Dos.dodo_u2g_name, ClientUtil.to_wei_asset(8, "ROUSD"), ClientUtil.to_wei_asset(1, "ROGBP"));
    }),
    "bu2h": (async function () {
        await pushAciton("buybasetoken", Dos.trader, Dos.dodo_u2h_name, ClientUtil.to_wei_asset(1, "ROUSD"), ClientUtil.to_wei_asset(1001, "ROHKD"));
    }),
    "su2h": (async function () {
        await pushAciton("sellbastoken", Dos.trader, Dos.dodo_u2h_name, ClientUtil.to_wei_asset(8, "ROUSD"), ClientUtil.to_wei_asset(1, "ROHKD"));
    }),
    "default": (async function () {
        console.log(ClientUtil.todecimal((1000)), "test option", ClientUtil.todecimal(1000));
    })

};

const f = handlers[argumentss[0]] || handlers["default"];
f();
