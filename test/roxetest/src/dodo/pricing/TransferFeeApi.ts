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

export class TransferFeeApi {
    symcode2fee: { [name: string]: any } = {};
    async fetchTransferFees() {
        const tokencode = "roxe.ro";
        let allrows = { rows: [], more: '0' };
        let res = { rows: [], more: '0' };
        // let reverses = [false, true];
        let lower_bound = "";
        while (res.more != '') {
            res = await rpc.get_table_by_scope({
                code: tokencode,
                table: 'stat',
                lower_bound: lower_bound,
            });

            if (res.rows.length > 0) {
                for (let r of res.rows) {
                    // console.log(r["scope"]);
                    const res1 = await rpc.get_table_rows({
                        code: tokencode,
                        table: 'stat',
                        scope: r["scope"]
                    });
                    // console.log(res1);//......2ocldp5      ......23cldp5
                    if (res1.rows.length > 0) {
                        allrows.rows = allrows.rows.concat(res1.rows);
                    }
                }
            }

            if (res.more != "") {
                lower_bound = res.more;
            }

            this.symcode2fee = refactoringObj(allrows.rows);
            // prettyJson(this.symcode2fee);

            return allrows;
        }

    }

    async getTransferFee(amount: number, symbolcode: any, is_in: boolean = false) {
        if (!this.symcode2fee.hasOwnProperty(symbolcode)) {
            return 0;
        }
        const percent_decimal = Math.pow(10, 6);
        const st = this.symcode2fee[symbolcode];
        //   symbol      fee_sym    = st.useroc ? core_symbol : st.supply.symbol;
        let fee_amount = Number(st.fee) + Math.floor(Number(amount) * Number(st.percent) / Number(percent_decimal));
        if (is_in) {
            fee_amount = Math.floor((Number(st.fee) * Number(percent_decimal) + Number(amount) * Number(st.percent)) / (Number(st.percent) + Number(percent_decimal)));
        }

        fee_amount = Math.min(Math.max(Number(fee_amount), Number(st.minfee)), Number(st.maxfee))
        return fee_amount;

    }




}

function refactoringObj(arr: any[]) {
    return arr.map((obj) => {
        let s = obj.supply.split(" ");
        let o: { [name: string]: any } = {};
        delete obj["supply"];
        delete obj["max_supply"];
        delete obj["issuer"];
        delete obj["authors"];
        o[s[1].trim()] = obj;

        return o;
    }).reduce((obj, o) => Object.assign(obj, o), {});
}


// (async function () {
//     const tfapi = new TransferFeeApi();
//     let bb: any = await tfapi.fetchTransferFees();
//     // //console.log("===m======");
//     // prettyJson(bb);
//     for (const t of Object.keys(tfapi.symcode2fee)) {
//         const o = tfapi.symcode2fee[t];
//         const tv = [Math.pow(10,12),o.maxfee + 1, o.maxfee, o.maxfee / 2, o.minfee + 1];
//         const inout = [false, true];
//         for (const v of tv) {
//             for (const io of inout) {

//                 const fee = await tfapi.getTransferFee(v, t, io);
//                 console.log("v,t,io,fee", v, t, io, fee);
//             }
//         }
//     }

// })();





