import "./utils/number.extensions";
import { Trader } from "./impl/Trader";
// const jq = require('node-jq');
const { chain } = require('../../eos-rpc');
const c = chain();
const prettyJson = async (log: any) => {
    // let jsonstr = await jq.run('.', JSON.stringify(log), { input: 'string', output: 'pretty' });
    console.log(JSON.stringify(log));
};
// import { SafeMath } from "./lib/SafeMath";
// console.log(SafeMath.divCeil(70, 7));
// let n: number = 70;
// console.log(n.divCeil(7));
export class TraderPricingApi {

    filter_fields: any[] = [
        "_LP_FEE_RATE_",
        "_MT_FEE_RATE_",
        "_K_",
        "_R_STATUS_",
        "_TARGET_BASE_TOKEN_AMOUNT_",
        "_TARGET_QUOTE_TOKEN_AMOUNT_",
        "_BASE_BALANCE_",
        "_QUOTE_BALANCE_"
    ];

    t: Trader = new Trader();

    // const Decimal = require('decimal.js');
    async getDodos(): Promise<any> {
        const res = await c.get_table_rows('eosdoseosdos', 'eosdoseosdos', 'dodo', true);
        prettyJson(res);
        let dodos = res.rows[0]["dodos"];
        let dodoo: { [name: string]: any } = {};
        // let dodosmap = dodos.map((dodo:any) => {

        //     return dodoo;
        // });

        for (let dodo of dodos) {
            dodoo[dodo.key] = {};
            for (let f of this.filter_fields) {
                dodoo[dodo.key][f] = dodo.value[f];
            }
        }

        // await prettyJson(dodoo);
        return dodoo;
    }

    async getOraclePrices(): Promise<any> {
        const res = await c.get_table_rows('eosdoseosdos', 'eosdoseosdos', 'oracle', true);
        prettyJson(res);
        let dodos = res.rows[0]["oracles"];
        let dodoo: { [name: string]: number } = {};
        for (let dodo of dodos) {
            let arr = dodo.value.tokenPrice.quantity.split(" ");
            dodoo[arr[1]] = arr[0];
        }

        // await prettyJson(dodoo);

        return dodoo;
    }

    async queryBuyToken(amount: number, baseToken: string, quoteToken: string) {
        let dodos = await this.getDodos();
        let oracles = await this.getOraclePrices();
        let dodo_name = baseToken.toLowerCase() + "2" + quoteToken.toLowerCase() + "11111";
        dodo_name = dodo_name.substr(0, 12);
        const testdodo_name: { [name: string]: string } = { "dai2mkr11111": "daimkrdaimkr", "eth2mkr11111": "ethbasemkr11" };
        console.log(dodo_name);

        let dodo = dodos[testdodo_name[dodo_name]];
        dodo._ORACLE_PRICE_ = Number(oracles[baseToken]);
        console.log(dodo);
        this.t.setParameters(dodo);
        const r: any = this.t.queryBuyBaseToken(amount);
        console.log(r);
        return r;
    }

    async querySellToken(amount: number, baseToken: string, quoteToken: string) {
        let dodos = await this.getDodos();
        let oracles = await this.getOraclePrices();
        let dodo_name = baseToken.toLowerCase() + "2" + quoteToken.toLowerCase() + "11111";
        dodo_name = dodo_name.substr(0, 12);
        const testdodo_name: { [name: string]: string } = { "dai2mkr11111": "daimkrdaimkr", "eth2mkr11111": "ethbasemkr11" };
        console.log(dodo_name);

        let dodo = dodos[testdodo_name[dodo_name]];
        dodo._ORACLE_PRICE_ = Number(oracles[baseToken]);
        console.log(dodo);
        this.t.setParameters(dodo);
        const r: any = this.t.querySellBaseToken(amount);
        console.log(r);
        return r;
    }

}



(async function () {
    const api = new TraderPricingApi();
    let b: any = await api.queryBuyToken(10000, "DAI", "MKR");
    console.log("==b==", b, "=====");
    let s: any = await api.querySellToken(10000, "DAI", "MKR");
    console.log("=s==", s, "===");
})();





