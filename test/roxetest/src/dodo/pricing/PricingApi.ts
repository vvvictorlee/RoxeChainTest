import { RefactoringTableJsonMin } from "./RefactoringTableJsonMin"

const { Api, JsonRpc, RpcError } = require('roxejs')
const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.load();
// const TokenDecimal = process.env.PRICING_DODO_EARN_ONE_DECIMALS;

// node only; not needed in browsers
const protocol = process.env.EOS_PROTOCOL || "http";
const host = process.env.EOS_HOST || "172.17.3.161";
const port = process.env.EOS_PORT || "7878";
const rpc = new JsonRpc(protocol + '://' + host + ':' + port, { fetch })

import { prettyJson } from "../lib/prettyjson";

const dodotablecode = process.env.PRICING_EARN_DODO_CONTRACT_ACCOUNT;

export class PricingApi {

    async getDodos() {
        console.log("==dodotablecode===", dodotablecode);
        let allrows = { rows: [], more: false };
        let res = { rows: [], more: true };
        let lower_bound = "1";
        while (res.more) {
            // console.log(JSON.stringify(res));
            res = await rpc.get_table_rows({
                code: dodotablecode,
                table: 'dodos',
                scope: dodotablecode,
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
        prettyJson(allrows);
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
                code: dodotablecode,
                table: 'oracleprices',
                scope: dodotablecode,
                lower_bound: lower_bound + 1
            });
            if (res.more) {
                lower_bound = Number(res.rows[res.rows.length - 1]["pair_token_hash_key"]);
            }
            if (res.rows.length > 0) {
                allrows.rows = allrows.rows.concat(res.rows);
            }

        }

        prettyJson(allrows);

        return allrows;
    }

    async getTransferFee() {
        const tokencode = "roxe.ro";
        let allrows = { rows: [], more: false };
        let res = { rows: [], more: true };
        // let reverses = [false, true];
        let lower_bound = 0;
        while (res.more) {
            // console.log(JSON.stringify(res));
            res = await rpc.get_table_rows({
                code: tokencode,
                table: 'stat',
                scope: tokencode,
limit:1
            });

            // lower_bound: lower_bound + 1
            if (res.more) {
                res.more = false;
                lower_bound = Number(res.rows[res.rows.length - 1]["supply"]);
            }
            if (res.rows.length > 0) {
                allrows.rows = allrows.rows.concat(res.rows);
            }

        }

        prettyJson(allrows);

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





