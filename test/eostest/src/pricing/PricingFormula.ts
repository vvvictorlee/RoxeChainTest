import "./utils/number.extensions";
import { Trader } from "./impl/Trader";
import { PricingApi } from "./PricingApi";
const prettier = require("prettier");

const prettyJson = async (log: any) => {
    //console.log(prettier.format(JSON.stringify(log), { semi: false, parser: "json" }));
    // let jsonstr = await jq.run('.', JSON.stringify(log), { input: 'string', output: 'pretty' });
    //console.log(JSON.stringify(log));
};
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
    }

    async queryDodo(baseToken: any, quoteToken: any) {
        let dodo_name = baseToken.toLowerCase() + "2" + quoteToken.toLowerCase() + "22222";
        dodo_name = dodo_name.substr(0, 12);
        const testdodo_name: any = { "rousd2rogbp1": "usd2gbp11111", "rousd2rohkd1": "usd2hkd11111", "weth2dai1111": "dai2mkr11111", "eth2mkr11111": "ethbasemkr11" };
        const mapname = testdodo_name[dodo_name];
        if (undefined != mapname) {
            dodo_name = mapname;
        }

        // //console.log(dodo_name);
        let dodo = this.galldodos[dodo_name];
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
    const basetoken = "USD";
    const quotetoken = "GBP";
    const papi = new PricingApi();
    let bb: any = await papi.getDodo();
    //console.log(JSON.stringify(bb));
    const api = new TraderPricingApi();
    api.init(JSON.stringify(bb));
    let b: any = await api.queryBuyToken(10000, basetoken, quotetoken);
    console.log("==b==", b, "=====");
    let s: any = await api.querySellToken(10000, basetoken, quotetoken);
    console.log("=s==", s, "===");
})();





