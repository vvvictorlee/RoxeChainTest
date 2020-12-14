import { refactoringPoolTableJson } from "./SwapRefactoringTableJson"

const { Api, JsonRpc, RpcError } = require('roxejs')
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const rpc = new JsonRpc('http://172.17.3.161:8888', { fetch })

const { init, buy, sell } = require('./swapapi')
import { prettyJson } from "../../lib/prettyjson";

export class SwapPricingApi {
    async getPools() {
        let allrows = { rows: [], more: false };
        let res = { rows: [], more: true };
        let lower_bound = "1";
        while (res.more) {
            console.log(JSON.stringify(res));
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
        // prettyJson(JSON.stringify(res));
        return allrows;
    }

    async getPool() {
        let pool = await this.getPools();
        // let oracle = await this.getOraclePrices();
        let jsonstr = refactoringPoolTableJson(pool);
        return jsonstr;
    }
}

(async function () {
    const api = new SwapPricingApi();
    let b: any = await api.getPool();
    console.log(JSON.stringify(b));
    init(JSON.stringify(b));
    console.log(sell(0.00000001, "BTC", "USD"));
    console.log(buy(0.00000001, "BTC", "USD"));
    // let s: any = await api.querySellToken(10000, "DAI", "MKR");
    // console.log("=s==", s, "===");
})();





