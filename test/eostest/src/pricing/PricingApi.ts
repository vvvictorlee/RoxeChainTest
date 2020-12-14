import { RefactoringTableJsonMin } from "./RefactoringTableJsonMin"

const { Api, JsonRpc, RpcError } = require('roxejs')
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const rpc = new JsonRpc('http://172.17.3.161:8888', { fetch })

import { prettyJson } from "../lib/prettyjson";

export class PricingApi {

    async getDodos() {
        let allrows = { rows: [], more: false };
        let res = { rows: [], more: true };
        let lower_bound = "1";
        while (res.more) {
            console.log(JSON.stringify(res));
            res = await rpc.get_table_rows({
                code: 'roxeearn1213',
                table: 'dodos',
                scope: 'roxeearn1213',
                lower_bound: lower_bound
            });
            if (res.more) {
                lower_bound = res.rows[res.rows.length - 1]["dodo_name"];
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

    async getOraclePrices() {
        let allrows = { rows: [], more: false };
        let res = { rows: [], more: true };
        // let reverses = [false, true];
        let lower_bound = 0;
        while (res.more) {
            // console.log(JSON.stringify(res));
            res = await rpc.get_table_rows({
                code: 'roxeearn1213',
                table: 'oracleprices',
                scope: 'roxeearn1213',
                lower_bound: lower_bound + 1
            });
            if (res.more) {
                lower_bound = Number(res.rows[res.rows.length - 1]["pair_token_hash_key"]);
            }
            if (res.rows.length > 0) {
                allrows.rows = allrows.rows.concat(res.rows);
            }

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





