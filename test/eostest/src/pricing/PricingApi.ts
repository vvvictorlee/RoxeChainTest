import { RefactoringTableJsonMin } from "./RefactoringTableJsonMin"

const { Api, JsonRpc, RpcError } = require('roxejs')
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const rpc = new JsonRpc('http://47.91.226.192:7878', { fetch })

// const jq = require('node-jq');
// const { chain } = require('../../../eos-rpc');
// // import { chain } from '../../../eos-rpc';
// const c = chain();
// const prettyJson =  (log: any) => {
//     let jsonstr =  jq.run('.', JSON.stringify(log), { input: 'string', output: 'pretty' });
//     console.log(jsonstr);
// };

export class PricingApi {

    async getDodos() {
        const res = await rpc.get_table_rows({
            code: 'eosdoseosdos',
            table: 'dodos',
            scope: 'eosdoseosdos'
        });
        console.log(JSON.stringify(res));
        // prettyJson(JSON.stringify(res));
        return res;
    }

    async getOraclePrices() {
        const res = await rpc.get_table_rows({
            code: 'eosdoseosdos',
            table: 'oracles',
            scope: 'eosdoseosdos'
        });
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





