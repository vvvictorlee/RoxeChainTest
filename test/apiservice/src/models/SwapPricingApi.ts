import { SwapRefactoringTableJson } from "./SwapRefactoringTableJson"

const { chain } = require('../../../eos-rpc');
// import { chain } from '../../../eos-rpc';
const c = chain();


export class SwapPricingApi {

    async getPools() {
        const res = await c.get_table_rows('eoswapeoswap', 'eoswapeoswap', 'poolstore', true);
        // console.log(JSON.stringify(res));
        // prettyJson(JSON.stringify(res));
        return res;
    }
    // async getOraclePrices() {
    //     const res = await c.get_table_rows('eoswapeoswap', 'eoswapeoswap', 'oracles', true);
    //     console.log(JSON.stringify(res));
    //     // await prettyJson(res);

    //     return res;
    // }

    async getPool() {
        let pool = await this.getPools();
        // let oracle = await this.getOraclePrices();
        let jsonstr = await new SwapRefactoringTableJson().refactoringTableDataJson(pool);
        // await prettyJson(dodojsonstr);
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





