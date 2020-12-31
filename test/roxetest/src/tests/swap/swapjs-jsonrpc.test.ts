const { init, buy, sell } = require('../../swap/pricing/swapapi')
import { prettyJson } from "../../lib/prettyjson";
import { SwapPricingApi } from "../../swap/pricing/swapPricingApi"
// const prettyFormat = require('pretty-format'); // CommonJS
import prettyFormat from 'pretty-format'; // ES2015 modules
import { SwapClient } from "../../swap/swap_client"
import { Swap } from "../../swap/client_data_test";

const users = ["bob111111111"];

describe('JSON RPC', () => {
    // const endpointExtraSlash = 'http://localhost/';
    // const endpoint = 'http://localhost';
    // const fetchMock = fetch as any;
    // let jsonRpc: JsonRpc;
    let rpc: any;
    let client = new SwapClient(Swap.BTC2USD, Swap.para);

    beforeEach(() => {
        rpc = client.common_client.para.rpc;
        // fetchMock.resetMocks();
        // jsonRpc = new JsonRpc(endpointExtraSlash);
    });

    it('SwapPricingApi', async () => {
        const api = new SwapPricingApi();
        let b: any = await api.getPool();
        console.log(prettyFormat(b));
        init(JSON.stringify(b));
        console.log(sell(0.00000001, "BTC", "USD"));
        console.log(buy(0.00000001, "BTC", "USD"));
        // let actMessage = '';
        // const expMessage = 'Not Found';
        // const accountName = 'myaccountaaa';
        // const expReturn = { data: '12345', message: expMessage };

        // fetchMock.once(JSON.stringify(expReturn), { status: 404 });

        // // async / await don't play well with expect().toThrow()
        // try {
        //     await jsonRpc.get_abi(accountName);
        // } catch (e) {
        //     expect(e).toBeInstanceOf(RpcError);
        //     actMessage = e.message;
        // }

        // expect(actMessage).toEqual(expMessage);
    });

    it('pools', async () => {
        const api = new SwapPricingApi();
        let b: any = await api.getPool();
        console.log(prettyFormat(b));
        init(JSON.stringify(b));
        console.log(sell(0.00000001, "BTC", "USD"));
        console.log(buy(0.00000001, "BTC", "USD"));
        // let actMessage = '';
        // const expMessage = 'Not Found';
        // const accountName = 'myaccountaaa';
        // const expReturn = { data: '12345', message: expMessage };

        // fetchMock.once(JSON.stringify(expReturn), { status: 404 });

        // // async / await don't play well with expect().toThrow()
        // try {
        //     await jsonRpc.get_abi(accountName);
        // } catch (e) {
        //     expect(e).toBeInstanceOf(RpcError);
        //     actMessage = e.message;
        // }

        // expect(actMessage).toEqual(expMessage);
    });



    it('getaccount', async () => {
        for (let user of users) {
            const res = await rpc.get_account(user);

            prettyJson(res);
        }
    });


    it('get_raw_code_and_abi', async () => {
        for (let user of users) {
            const res = await rpc.get_raw_code_and_abi(user);

            // console.log(JSON.stringify(res));
            prettyJson(res);
        }
        for (let user of users) {
            const res = await rpc.get_abi(user);

            // console.log(JSON.stringify(res));
            prettyJson(res);
        }

    });


    it('get_table_by_scope', async () => {
        const res = await rpc.get_table_by_scope({
            code: 'eoswapxtoken',
            table: 'stat'
        });
        prettyJson(res);

    });


    it('get_table_by_scope stat', async () => {
        let res = await rpc.get_table_by_scope({
            code: 'eoswapxtoken',
            table: 'stat'
        });
        prettyJson(res);
        for (let r of res.rows) {
            res = await rpc.get_table_rows({
                code: 'eoswapxtoken',
                table: 'stat',
                scope: r.scope
            });
            prettyJson(res);
        }

    });


    it('accounts', async () => {
        const users = ["roxeswaptest"];
        for (let user of users) {
            const res = await rpc.get_table_rows({
                code: "roxe.token",
                table: "accounts",
                scope: user
            });
            console.log(user, "=====");
            prettyJson(res);
        }
    });


    it('roxeswaptest pools', async () => {
        const res = await rpc.get_table_rows({
            code: 'roxeswaptest',
            table: 'pools',
            scope: 'roxeswaptest'
        });
        prettyJson(res);
    });




});
