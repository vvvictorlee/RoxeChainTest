import "./utils/number.extensions";
import { Trader } from "./impl/Trader";
import { PricingApi } from "./PricingApi";
import { prettyJson } from "../lib/prettyjson";

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
        prettyJson(this.galldodos);
    }

    async queryDodo(baseToken: any, quoteToken: any) {
        let dodo_name = baseToken.toLowerCase() + "2" + quoteToken.toLowerCase() + "333333";
        dodo_name = dodo_name.substr(0, 12);
        const testdodo_name: any = { "rousd2rogbp1": "usd2gbp2222", "rousd2rohkd1": "usd2hkd2222", "weth2dai1111": "dai2mkr11111", "eth2mkr11111": "ethbasemkr11" };
        const mapname = testdodo_name[dodo_name];
        if (undefined != mapname) {
            dodo_name = mapname;
        }

        // console.log("======dodo_name======",dodo_name);
        let dodo = this.galldodos[Object.keys(this.galldodos)[0]];
        if (this.galldodos.hasOwnProperty(dodo_name)) {
            dodo = this.galldodos[dodo_name];
        }

        // dodo._ORACLE_PRICE_ = Number(galloracles[baseToken]);
        // //console.log(dodo);

        return dodo;
    }

    async queryBuyTokenWithDodo(amount: any, dodo: any) {
        this.t.setParameters(dodo);
        ////console.log(amount, dodo);
        let r = this.t.queryBuyBaseToken(amount);
        ////console.log(r);
        return r;
    }

    async querySellTokenWithDodo(amount: any, dodo: any) {
        this.t.setParameters(dodo);
        let r = this.t.querySellBaseToken(amount);
        ////console.log(r);
        return r;
    }

    async queryBuyToken(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        //////console.log(amount, dodojson);
        let r = await this.queryBuyTokenWithDodo(amount, dodo);
        //////console.log(r);
        return Number(r);
    }
    async querySellToken(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        let r = await this.querySellTokenWithDodo(amount, dodo);
        //////console.log(r);
        return Number(r);
    }
}

(async function () {

    const papi = new PricingApi();
    let bb: any = await papi.getDodo();
    // console.log("===m======");
    // prettyJson(bb);
    const api = new TraderPricingApi();
    api.init(JSON.stringify(bb));
    const amount: number = 1000000;
    const basetoken = "USD";
    const quotetoken = "GBP";
    let b: any = await api.queryBuyToken(amount, basetoken, quotetoken);
    console.log("==b==", b, "=====");
    let s: any = await api.querySellToken(amount, basetoken, quotetoken);
    console.log("=s==", s, "===");
    {
        const basetoken = "GBP";
        const quotetoken = "HKD";
        let b: any = await api.queryBuyToken(amount, basetoken, quotetoken);
        console.log("==b==", b, "=====");
        let s: any = await api.querySellToken(amount, basetoken, quotetoken);
        console.log("=s==", s, "===");
    }

})();





