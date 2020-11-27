import { refactoringPoolTableJson } from "./SwapRefactoringTableJson"

const { Api, JsonRpc, RpcError } = require('roxejs')
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const rpc = new JsonRpc('http://47.91.226.192:7878', { fetch })

export class SwapPricingApi {
    async getPools() {
        const res = await rpc.get_table_rows({
            code: 'eoswapeoswap',
            table: 'poolstore',
            scope: 'eoswapeoswap'
        });
        return res;
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
    console.log( JSON.stringify(b) );
    // let s: any = await api.querySellToken(10000, "DAI", "MKR");
    // console.log("=s==", s, "===");
})();





