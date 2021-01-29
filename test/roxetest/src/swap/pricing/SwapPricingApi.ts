import { refactoringPoolTableJson } from "./SwapRefactoringTableJson"

const { Api, JsonRpc, RpcError } = require('roxejs')
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const dotenv = require('dotenv');
dotenv.load();
// const TokenDecimal = process.env.PRICING_DODO_EARN_ONE_DECIMALS;

// node only; not needed in browsers
const protocol = process.env.EOS_PROTOCOL || "http";
const host = process.env.EOS_HOST || "172.17.3.161";
const port = process.env.EOS_PORT || "7878";
const rpc = new JsonRpc(protocol + '://' + host + ':' + port, { fetch })

const { init, buy, sell } = require('./swapapi')
import { prettyJson } from "../../lib/prettyjson";

export class SwapPricingApi {
    async getPools() {
        let allrows = { rows: [], more: false };
        let res = { rows: [], more: true };
        let lower_bound = "1";
        while (res.more) {
            res = await rpc.get_table_rows({
                code: 'roxeswap1213',
                table: 'pools',
                scope: 'roxeswap1213',
                lower_bound: lower_bound
            });
            if (res.more) {
                lower_bound = res.rows[res.rows.length - 1]["pool_name"];
            }
            if (allrows.rows.length > 0 && res.rows.length > 1) {
                res.rows.splice(1);
            }
            if (res.rows.length > 0) {
                allrows.rows = allrows.rows.concat(res.rows);
            }

        }
        //console.log(JSON.stringify(res));
        // prettyJson(allrows);
        return allrows;
    }

    async getPool() {
        let pool = await this.getPools();
        let jsonstr = JSON.stringify(refactoringPoolTableJson(pool));
// prettyJson(jsonstr);
        return jsonstr;
    }
}

(async function () {
    // const api = new SwapPricingApi();
    // let b: any = await api.getPool();
    // // console.log(JSON.stringify(b));
    // init(JSON.stringify(b));
    // console.log(sell(0.00000001, "BTC", "USD"));
    // console.log(buy(0.00000001, "BTC", "USD"));
    // let s: any = await api.querySellToken(10000, "DAI", "MKR");
    // console.log("=s==", s, "===");
})();





