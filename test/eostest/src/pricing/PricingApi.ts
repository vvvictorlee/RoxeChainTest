import { RefactoringTableJsonMin } from "./RefactoringTableJsonMin"

const { Api, JsonRpc, RpcError } = require('roxejs')
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const rpc = new JsonRpc('http://172.17.3.161:8888', { fetch })

import { prettyJson } from "./utils/prettyjson";

export class PricingApi {

    async getDodos() {
        const res = await rpc.get_table_rows({
            code: 'eosdoseosdos',
            table: 'dodos',
            scope: 'eosdoseosdos'
        });
        //console.log(JSON.stringify(res));
        // prettyJson(JSON.stringify(res));
        return res;
    }

    async getOraclePrices() {
       let allrows = { rows: [], more: false };
        let res = { rows: [], more: true };
        let reverses = [false, true];
        for (let reverse of reverses) {
            res = await rpc.get_table_rows({
                code: 'eosdoseosdos',
                table: 'oracles',
                scope: 'eosdoseosdos',
                reverse: reverse
            });
            allrows.rows = allrows.rows.concat(res.rows);

        }
        // console.log(JSON.stringify(allrows));

        return allrows;
    }

    async getDodo() {
        let dodo = await this.getDodos();
        let oracle = await this.getOraclePrices();
        let dodojsonstr = await new RefactoringTableJsonMin().refactoringTableDataJson(dodo, oracle);
        // await prettyJson(dodojsonstr);
        return dodojsonstr;
    }
}





