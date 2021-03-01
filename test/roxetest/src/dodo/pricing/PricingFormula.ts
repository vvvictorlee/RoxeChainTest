import "./utils/number.extensions";
import { Trader } from "./impl/Trader";
import { PricingApi } from "./PricingApi";
import { TransferFeeApi } from "./TransferFeeApi";
import { prettyJson } from "../lib/prettyjson";
const dotenv = require('dotenv');
dotenv.load();
const TokenDecimal = Math.pow(10, Number(process.env.PRICING_DODO_EARN_ONE_DECIMALS));
const suffix = process.env.suffix || "re"
const debug = require("debug");
const formula = debug('formula');
// debug.enable("formula");
// // // debug.disable("formula");
// // // const trader = debug('trader');
// debug.enable("trader");
// debug.disable("trader");
// debug.enable("pricing");
// debug.disable("pricing");
// debug.enable("dodomath");
// debug.disable("dodomath");

// debug.enable("*");

// debug.enable('foo:*,-foo:bar');
// let namespaces = debug.disable();
// debug.enable(namespaces);

// import { SafeMath } from "./lib/SafeMath";
// ////console.log(SafeMath.divCeil(70, 7));
// let n: number = 70;
// ////console.log(n.divCeil(7));
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

    async init(strdodos: any) {
        this.galldodos = JSON.parse(strdodos);
        // prettyJson(this.galldodos);
        await this.t.tfapi.fetchTransferFees();
    }

    async setTestDodo(dodos: any, xtimes: any) {
        const times: number = Math.pow(10, Number(xtimes + 6));
        const keys = Object.keys(dodos);
        for (let key of keys) {
            if (!this.galldodos.hasOwnProperty(key)) {
                continue;
            }
            this.galldodos[key]._TARGET_BASE_TOKEN_AMOUNT_ = dodos[key]._BASE_BALANCE_ * Number(times);
            this.galldodos[key]._TARGET_QUOTE_TOKEN_AMOUNT_ = dodos[key]._QUOTE_BALANCE_ * Number(times);
            this.galldodos[key]._BASE_BALANCE_ = dodos[key]._BASE_BALANCE_ * Number(times);
            this.galldodos[key]._QUOTE_BALANCE_ = dodos[key]._QUOTE_BALANCE_ * Number(times);
        }

    }

    async setTestRStatus(status: any) {
        const keys = Object.keys(this.galldodos);
        for (let key of keys) {
            this.galldodos[key]._R_STATUS_ = status;
        }

    }

    async queryDodo(baseToken: any, quoteToken: any) {
        //prod env
        let dodo_name = "re." + baseToken.toLowerCase() + quoteToken.toLowerCase();
        if ("re" != suffix) {
            //test env
            //console.log("suffix==",suffix);
            dodo_name = baseToken.toLowerCase() + "2" + quoteToken.toLowerCase() + suffix;
        }

        //console.log("======dodo_name======", dodo_name);
        let dodo = this.galldodos[Object.keys(this.galldodos)[0]];
        if (this.galldodos.hasOwnProperty(dodo_name)) {
            dodo = this.galldodos[dodo_name];
        }
        else {
            console.error("====NOT FOUND==dodo_name======", dodo_name);
        }

        // dodo._ORACLE_PRICE_ = Number(galloracles[baseToken]);
        //console.log(dodo);

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
        ////////console.log(r);
        return r;
    }

    async querySellQuoteWithDodo(amount: any, dodo: any,baseToken: any) {
        this.t.setParameters(dodo);
        let r = this.t.querySellQuoteToken(amount,baseToken);
        ////////console.log(r);
        return r;
    }

    async queryBuyToken(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        dodo.transfer_fee = await this.t.tfapi.getTransferFee(amount, baseToken);
        //////////console.log(amount, dodojson);
        let r = await this.queryBuyTokenWithDodo(amount, dodo);
        // //console.log(r);
        return Number(r);
    }
    async querySellToken(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        dodo.transfer_fee = await this.t.tfapi.getTransferFee(amount, quoteToken, true);
        let r = await this.querySellTokenWithDodo(amount, dodo);
        //console.log(r);
        return Number(r);
    }

    async querySellQuote(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        // dodo.transfer_fee = await this.t.tfapi.getTransferFee(amount, baseToken);
        // formula("====dodo.transfer_fee=====",dodo.transfer_fee);
        let r = await this.querySellQuoteWithDodo(amount, dodo,baseToken);
        //console.log(r);
        return Number(r);
    }

    async querySellQuoteDetail(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        this.t.setParameters(dodo);
        return this.t.querySellQuoteTokenDetail(amount * TokenDecimal,baseToken);
        //////////console.log(r);
    }

    async queryBuyTokenDetail(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        dodo.transfer_fee = await this.t.tfapi.getTransferFee(amount, baseToken);
        this.t.setParameters(dodo);
        return this.t.queryBuyBaseTokenDetail(amount * TokenDecimal);
        //////////console.log(r);
    }

    async querySellTokenDetail(amount: any, baseToken: any, quoteToken: any) {
        let dodo = await this.queryDodo(baseToken, quoteToken);
        dodo.transfer_fee = await this.t.tfapi.getTransferFee(amount, quoteToken, true);
        this.t.setParameters(dodo);
        return this.t.querySellBaseTokenDetail(amount);
        //////////console.log(r);
    }

}


const papi = new PricingApi();
const api = new TraderPricingApi();
const TestDodos = {
    gbp2hkd44444: {
        _ORACLE_PRICE_: 10.472973,
        _LP_FEE_RATE_: 1,
        _MT_FEE_RATE_: 0,
        _K_: 1,
        _R_STATUS_: 2,
        _TARGET_BASE_TOKEN_AMOUNT_: '740000000000',
        _TARGET_QUOTE_TOKEN_AMOUNT_: '7749989527047',
        _BASE_BALANCE_: '740001000000',
        _QUOTE_BALANCE_: '7749979054074'
    },
    usd2gbp44444: {
        _ORACLE_PRICE_: 730000,
        _LP_FEE_RATE_: 595,
        _MT_FEE_RATE_: 105,
        _K_: 100,
        _R_STATUS_: 2,
        _TARGET_BASE_TOKEN_AMOUNT_: '10004684893',
        _TARGET_QUOTE_TOKEN_AMOUNT_: '7303456229',
        _BASE_BALANCE_: '10126149201',
        _QUOTE_BALANCE_: '7214802230'
    },
    usd2hkd44444: {
        _ORACLE_PRICE_: 7750000,
        _LP_FEE_RATE_: 680,
        _MT_FEE_RATE_: 120,
        _K_: 100,
        _R_STATUS_: 2,
        _TARGET_BASE_TOKEN_AMOUNT_: '999887510956',
        _TARGET_QUOTE_TOKEN_AMOUNT_: '7749996743096',
        _BASE_BALANCE_: '1006750845804',
        _QUOTE_BALANCE_: '7696808415748'
    }
};

//  "_LP_FEE_RATE_": 595,
//         "_MT_FEE_RATE_": 105,
//         "_K_": 100,
//         "_R_STATUS_": 2,
//         "_TARGET_BASE_TOKEN_AMOUNT_": "10004684893",
//         "_TARGET_QUOTE_TOKEN_AMOUNT_": "7303456229",
//         "_BASE_BALANCE_": "10126149201",
//         "_QUOTE_BALANCE_": "7214802230",

// {
//   "usd2gbplml22": {
//     "_ORACLE_PRICE_": 730000,
//     "_LP_FEE_RATE_": 595,
//     "_MT_FEE_RATE_": 105,
//     "_K_": 100,
//     "_R_STATUS_": 1,
//     "_TARGET_BASE_TOKEN_AMOUNT_": "10004687129",
//     "_TARGET_QUOTE_TOKEN_AMOUNT_": "7302906402",
//     "_BASE_BALANCE_": "8826149201",
//     "_QUOTE_BALANCE_": "8163254191"
//   }
// }


// "_R_STATUS_": 1,
// "_TARGET_BASE_TOKEN_AMOUNT_": 952116302,
// "_TARGET_QUOTE_TOKEN_AMOUNT_": 700018314,
// "_BASE_BALANCE_": 926894600,
// "_QUOTE_BALANCE_": 718454552,


(async function () {


    let dodosFromTestChain: any = await papi.getDodo();

    // formula("dodosFromTestChain===", dodosFromTestChain, "====");
    // prettyJson(dodosFromTestChain);
    await api.init(JSON.stringify(dodosFromTestChain));

    // await api.init(JSON.stringify(TestDodos));
    // const amount = 1000;//1750540351660;//199998500000;//6008550000;
    const amounts = [1000000];//1345678//50556060000, 517000000000 698649560000 //689263550000//1,1000,//1545915510000;//5945945990;//4400;
    // const amounts = [400568337469, 50556060000, 5000000000, 500000000, 50000000, 5000000, 1000000, 1000];//, 517000000000 698649560000 //689263550000//1,1000,//1545915510000;//5945945990;//4400;    
    const tokens = [["USD", "GBP"]];//, ["GBP", "HKD"], ["USD", "HKD"],["USD", "GBP"]
    for (let t of tokens) {
        for (let amount of amounts) {
            const basetoken = t[0];
            const quotetoken = t[1];
            {
                // let b: any = await api.queryBuyToken(amount, basetoken, quotetoken);
                // console.log("=buy2 =", amount, " ", basetoken, "=by=", quotetoken, "===", (b), "=====");
                //     let s: any = await api.querySellToken(amount, basetoken, quotetoken);
                //     console.log("=sell =", amount, " ", basetoken, "=by=", quotetoken, "===", (s), "=====");
                let q: any = await api.querySellQuote(amount, basetoken, quotetoken);
                console.log("=sell quote =", amount, " ", quotetoken, "=by=", basetoken, "===", (q), "=====");
                amount = q;//1.821307
                let qb: any = await api.queryBuyToken(amount, basetoken, quotetoken);
                console.log("=buy by quote =", amount, " ", basetoken, "=by=", quotetoken, "===", (qb), "=====");
            }

            {
                // let b: any = await api.queryBuyToken(amount, basetoken, quotetoken);
                // console.log("=buy2 =", amount, " ", basetoken, "=by=", quotetoken, "===", (b), "=====");
                //     let s: any = await api.querySellToken(amount, basetoken, quotetoken);
                //     console.log("=sell =", amount, " ", basetoken, "=by=", quotetoken, "===", (s), "=====");
                amount = 100;
               let q: any = await api.querySellQuoteDetail(amount, basetoken, quotetoken);
                console.log("=sell quote detail=", amount, " ", quotetoken, "=by=", basetoken, "===", (q), "=====");
                amount = q.receiveBase;//1.821307
                let qb: any = await api.queryBuyTokenDetail(amount, basetoken, quotetoken);
                console.log("=buy by quote deatail  =", amount, " ", basetoken, "=by=", quotetoken, "===", (qb), "=====");
            }

            // {
            //     let b: any = await api.queryBuyTokenDetail(amount1, basetoken, quotetoken);
            //     //console.log("=******buy3 =", basetoken, "=by=", quotetoken, "===", (b), "=====");
            //     let s: any = await api.querySellTokenDetail(amount1, basetoken, quotetoken);
            //     //console.log("=******sell =", basetoken, "=by=", quotetoken, "===", (s), "=====");
            // }


        }
    }

})();





//     let dodo = JSON.parse('{"_ORACLE_PRICE_":0.735475,"_LP_FEE_RATE_":595,"_MT_FEE_RATE_":105,"_K_":100,"_R_STATUS_":1,"_TARGET_BASE_TOKEN_AMOUNT_":952032051,"_TARGET_QUOTE_TOKEN_AMOUNT_":700013214,"_BASE_BALANCE_":939607513,"_QUOTE_BALANCE_":709146807}');//await this.queryDodo(baseToken, quoteToken);
//   let dodo = JSON.parse('{"_ORACLE_PRICE_":0.735475,"_LP_FEE_RATE_":595,"_MT_FEE_RATE_":105,"_K_":100,"_R_STATUS_":1,"_TARGET_BASE_TOKEN_AMOUNT_":952032051,"_TARGET_QUOTE_TOKEN_AMOUNT_":700013214,"_BASE_BALANCE_":939607513,"_QUOTE_BALANCE_":709146807}');//await api.queryDodo(baseToken, quoteToken);

//     // let dodo = JSON.parse('{"_ORACLE_PRICE_":0.735475,"_LP_FEE_RATE_":595,"_MT_FEE_RATE_":105,"_K_":100,"_R_STATUS_":1,"_TARGET_BASE_TOKEN_AMOUNT_":952032051,"_TARGET_QUOTE_TOKEN_AMOUNT_":700013214,"_BASE_BALANCE_":939607513,"_QUOTE_BALANCE_":709146807}');//await api.queryDodo(baseToken, quoteToken);
//     let dodo = {
//         _ORACLE_PRICE_: 0.74,
//         _LP_FEE_RATE_: 595,
//         _MT_FEE_RATE_: 105,
//         _K_: 100,
//         _R_STATUS_: 2,
//         _TARGET_BASE_TOKEN_AMOUNT_: '994358158970',
//         _TARGET_QUOTE_TOKEN_AMOUNT_: '739566542199',
//         _BASE_BALANCE_: '1750540351660',
//         _QUOTE_BALANCE_: '180165525862'
//     };


//     let dodo = {
//         _ORACLE_PRICE_: 0.730985,
//         _LP_FEE_RATE_: 595,
//         _MT_FEE_RATE_: 105,
//         _K_: 100,
//         _R_STATUS_: 1,
//         _TARGET_BASE_TOKEN_AMOUNT_: 952000000,
//         _TARGET_QUOTE_TOKEN_AMOUNT_: 700000000,
//         _BASE_BALANCE_: 952000000,
//         _QUOTE_BALANCE_: 700000000
//     };
//     // "usd2gbp44444":
//     const dodostr = ' {\
//     "_ORACLE_PRICE_": 0.74,\
//     "_LP_FEE_RATE_": 595,\
//     "_MT_FEE_RATE_": 105,\
//     "_K_": 100,\
//     "_R_STATUS_": 1,\
//     "_TARGET_BASE_TOKEN_AMOUNT_": "994984160697",\
//     "_TARGET_QUOTE_TOKEN_AMOUNT_": "739567242253",\
//     "_BASE_BALANCE_": "699158038448",\
//     "_QUOTE_BALANCE_": "958488190546"\
//   }';
