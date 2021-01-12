import "./utils/number.extensions";
import { Trader } from "./impl/Trader";
import { PricingApi } from "./PricingApi";
import { prettyJson } from "../lib/prettyjson";
const dotenv = require('dotenv');
dotenv.load();
const TokenDecimal = Math.pow(10, Number(process.env.PRICING_DODO_EARN_ONE_DECIMALS));

// import { SafeMath } from "./lib/SafeMath";
// //console.log(SafeMath.divCeil(70, 7));
// let n: number = 70;
// //console.log(n.divCeil(7));
export class TraderPricingApi {

    filter_fields: any[] = [
        "_LP_FEE_RATE_",
        "_MT_FEE_RATE_",
        "_K_",
        "_R_STATUS_",
        "_TARGET_BASE_TOKEN_AMOUNT_",
        "_TARGET_QUOTE_TOKEN_AMOUNT_",
        "_BASE_BALANCE_",
        "_QUOTE_BALANCE_"
    ];

    t: Trader = new Trader();

    galldodos: any = {};

    init(strdodos: any) {
        this.galldodos = JSON.parse(strdodos);
        // prettyJson(this.galldodos);
    }

    async queryDodo(baseToken: any, quoteToken: any) {
//prod env
        // let dodo_name = "re." + baseToken.toLowerCase() + quoteToken.toLowerCase();
//test env
 let dodo_name =  baseToken.toLowerCase()+"2"  + quoteToken.toLowerCase()+"44444";
        console.log("======dodo_name======", dodo_name);
        let dodo = this.galldodos[Object.keys(this.galldodos)[0]];
        if (this.galldodos.hasOwnProperty(dodo_name)) {
            dodo = this.galldodos[dodo_name];
        }
        else {
            console.log("====NOT FOUND==dodo_name======", dodo_name);
        }

        // dodo._ORACLE_PRICE_ = Number(galloracles[baseToken]);
        console.log(dodo);

        return dodo;
    }

    async queryBuyTokenWithDodo(amount: any, dodo: any) {
        this.t.setParameters(dodo);
        //console.log(amount, dodo);
        let r = this.t.queryBuyBaseToken(amount);
        //console.log(r);
        return r;
    }

    async querySellTokenWithDodo(amount: any, dodo: any) {
        this.t.setParameters(dodo);
        let r = this.t.querySellBaseToken(amount);
        //////console.log(r);
        return r;
    }

    async queryBuyTokenTest(amount: any, baseToken: any, quoteToken: any) {
        // let dodo = await this.queryDodo(baseToken, quoteToken);
        // let dodo = JSON.parse('{"_ORACLE_PRICE_":0.735475,"_LP_FEE_RATE_":595,"_MT_FEE_RATE_":105,"_K_":100,"_R_STATUS_":1,"_TARGET_BASE_TOKEN_AMOUNT_":952032051,"_TARGET_QUOTE_TOKEN_AMOUNT_":700013214,"_BASE_BALANCE_":939607513,"_QUOTE_BALANCE_":709146807}');//await this.queryDodo(baseToken, quoteToken);
        let dodo = {
  _ORACLE_PRICE_: 0.74,
  _LP_FEE_RATE_: 595,
  _MT_FEE_RATE_: 105,
  _K_: 100,
  _R_STATUS_: 2,
  _TARGET_BASE_TOKEN_AMOUNT_: '994358158970',
  _TARGET_QUOTE_TOKEN_AMOUNT_: '739566542199',
  _BASE_BALANCE_: '1750540351660',
  _QUOTE_BALANCE_: '180165525862'
        };
        ////////console.log(amount, dodojson);
        let r = await this.queryBuyTokenWithDodo(amount, dodo);
        console.log(r);
        return Number(r);
    }

    async querySellTokenTest(amount: any, baseToken: any, quoteToken: any) {
        // let dodo = await this.queryDodo(baseToken, quoteToken);
        // let dodo = JSON.parse('{"_ORACLE_PRICE_":0.735475,"_LP_FEE_RATE_":595,"_MT_FEE_RATE_":105,"_K_":100,"_R_STATUS_":1,"_TARGET_BASE_TOKEN_AMOUNT_":952032051,"_TARGET_QUOTE_TOKEN_AMOUNT_":700013214,"_BASE_BALANCE_":939607513,"_QUOTE_BALANCE_":709146807}');//await this.queryDodo(baseToken, quoteToken);

        let dodo = {
            _ORACLE_PRICE_: 0.730985,
            _LP_FEE_RATE_: 595,
            _MT_FEE_RATE_: 105,
            _K_: 100,
            _R_STATUS_: 1,
            _TARGET_BASE_TOKEN_AMOUNT_: 952000000,
            _TARGET_QUOTE_TOKEN_AMOUNT_: 700000000,
            _BASE_BALANCE_: 952000000,
            _QUOTE_BALANCE_: 700000000
        };
        let r = await this.querySellTokenWithDodo(amount, dodo);
        console.log(r);
        return Number(r);
    }

    async queryBuyToken(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        ////////console.log(amount, dodojson);
        let r = await this.queryBuyTokenWithDodo(amount, dodo);
        console.log(r);
        return Number(r);
    }
    async querySellToken(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        let r = await this.querySellTokenWithDodo(amount, dodo);
        console.log(r);
        return Number(r);
    }

    async queryBuyTokenDetail(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        this.t.setParameters(dodo);
        return this.t.queryBuyBaseTokenDetail(amount* TokenDecimal );
        ////////console.log(r);
    }

    async querySellTokenDetail(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        this.t.setParameters(dodo);
        return this.t.querySellBaseTokenDetail(amount);
        ////////console.log(r);
    }

    async queryBuyTokenDetailTest(amount: any, baseToken: any, quoteToken: any) {
        // let dodo = await this.queryDodo(baseToken, quoteToken);
        let dodo = JSON.parse('{"_ORACLE_PRICE_":0.735475,"_LP_FEE_RATE_":595,"_MT_FEE_RATE_":105,"_K_":100,"_R_STATUS_":1,"_TARGET_BASE_TOKEN_AMOUNT_":952032051,"_TARGET_QUOTE_TOKEN_AMOUNT_":700013214,"_BASE_BALANCE_":939607513,"_QUOTE_BALANCE_":709146807}');//await this.queryDodo(baseToken, quoteToken);
        this.t.setParameters(dodo);
        return this.t.queryBuyBaseTokenDetail(amount);
        ////////console.log(r);
    }

    async querySellTokenDetailTest(amount: any, baseToken: any, quoteToken: any) {
        let dodo = JSON.parse('{"_ORACLE_PRICE_":0.735475,"_LP_FEE_RATE_":595,"_MT_FEE_RATE_":105,"_K_":100,"_R_STATUS_":1,"_TARGET_BASE_TOKEN_AMOUNT_":952032051,"_TARGET_QUOTE_TOKEN_AMOUNT_":700013214,"_BASE_BALANCE_":939607513,"_QUOTE_BALANCE_":709146807}');//await this.queryDodo(baseToken, quoteToken);
        this.t.setParameters(dodo);
        let r = this.t.querySellBaseTokenDetail(amount);
        console.log(r);
        return r;
    }

}


(async function () {
   const papi = new PricingApi();
const s = await papi.getTransferFee();
console.log(s);
return;
 
    let bb: any = await papi.getDodo();
    // //console.log("===m======");
    // prettyJson(bb);
    const api = new TraderPricingApi();
    api.init(JSON.stringify(bb));
    const amount = 1750540351660;//199998500000;//6008550000;
    const amount1 = 1545915510000;//5945945990;//4400;
    const tokens = [["USD", "GBP"]];//, ["GBP", "HKD"], ["USD", "HKD"]
    for (let t of tokens) {
        const basetoken = t[0];
        const quotetoken = t[1];
        // let b: any = await api.queryBuyToken(amount1, basetoken, quotetoken);
        // console.log("=*********buy1 =",amount1," ", basetoken, "=by=", quotetoken, "===", (b), "=====");
        // let s: any = await api.querySellToken(amount, basetoken, quotetoken);
        // console.log("=**********sell =", basetoken, "=by=", quotetoken, "===", (s), "=====");
        // {
        //         let b: any = await api.queryBuyToken(amount1, basetoken, quotetoken);
        //         console.log("=buy1 =", basetoken, "=by=", quotetoken, "===", (b), "=====");
        //         let s: any = await api.querySellToken(amount1, basetoken, quotetoken);
        //         console.log("=sell =", basetoken, "=by=", quotetoken, "===", (s), "=====");
        // }
        // {
            let b: any = await api.queryBuyTokenTest(amount1, basetoken, quotetoken);
            console.log("=buy2 =",amount1," ", basetoken, "=by=", quotetoken, "===", (b), "=====");
        //     let s: any = await api.querySellTokenTest(amount, basetoken, quotetoken);
        //     console.log("=sell =", basetoken, "=by=", quotetoken, "===", (s), "=====");
        // }
        // {
        //     let b: any = await api.queryBuyTokenDetail(amount1, basetoken, quotetoken);
        //     console.log("=******buy3 =", basetoken, "=by=", quotetoken, "===", (b), "=====");
        //     let s: any = await api.querySellTokenDetail(amount1, basetoken, quotetoken);
        //     console.log("=******sell =", basetoken, "=by=", quotetoken, "===", (s), "=====");
        // }
        // {
        //     let b: any = await api.queryBuyTokenDetailTest(amount, basetoken, quotetoken);
        //     console.log("=buy4 =", basetoken, "=by=", quotetoken, "===", (b), "=====");
        //     let s: any = await api.querySellTokenDetailTest(amount, basetoken, quotetoken);
        //     console.log("=sell =", basetoken, "=by=", quotetoken, "===", (s), "=====");
        //     {
        //         let s: any = await api.querySellTokenDetailTest(amount1, basetoken, quotetoken);
        //         console.log("=sell =", basetoken, "=by=", quotetoken, "===", (s), "=====");
        //     }
        // }
    }

})();
