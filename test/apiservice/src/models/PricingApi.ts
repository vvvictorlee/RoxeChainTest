import { RefactoringTableJsonMin } from "./RefactoringTableJsonMin"

// const jq = require('node-jq');
const { chain } = require('../../../eos-rpc');
// import { chain } from '../../../eos-rpc';
const c = chain();
// const prettyJson =  (log: any) => {
//     let jsonstr =  jq.run('.', JSON.stringify(log), { input: 'string', output: 'pretty' });
//     console.log(jsonstr);
// };

export class PricingApi {

    async getDodos() {
        const res = await c.get_table_rows('eosdoseosdos', 'eosdoseosdos', 'dodos', true);
        console.log(JSON.stringify(res));
        // prettyJson(JSON.stringify(res));
        return res;
    }
    async getOraclePrices() {
        const res = await c.get_table_rows('eosdoseosdos', 'eosdoseosdos', 'oracles', true);
        console.log(JSON.stringify(res));
        // await prettyJson(res);

        return res;
    }

    async getDodo() {
        let dodo = await this.getDodos();
        let oracle = await this.getOraclePrices();
        let dodojsonstr = await new RefactoringTableJsonMin().refactoringTableDataJson(dodo, oracle);
        // await prettyJson(dodojsonstr);
        return dodojsonstr;
    }
}

// (async function () {
//     const api = new PricingApi();
//     let b: any = await api.getDodo();
//     console.log( JSON.stringify(b) );
//     // let s: any = await api.querySellToken(10000, "DAI", "MKR");
//     // console.log("=s==", s, "===");
// })();





