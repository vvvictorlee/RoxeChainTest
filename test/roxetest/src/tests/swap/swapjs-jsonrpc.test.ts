const { init, buy, sell } = require('../../swap/pricing/swapapi')
import { prettyJson } from "../../lib/prettyjson";
import { SwapPricingApi } from "../../swap/pricing/swapPricingApi"
// const prettyFormat = require('pretty-format'); // CommonJS
import  prettyFormat from 'pretty-format'; // ES2015 modules

describe('JSON RPC', () => {
    // const endpointExtraSlash = 'http://localhost/';
    // const endpoint = 'http://localhost';
    // const fetchMock = fetch as any;
    // let jsonRpc: JsonRpc;

    beforeEach(() => {
        // fetchMock.resetMocks();
        // jsonRpc = new JsonRpc(endpointExtraSlash);
    });

    it('throws error bad status', async () => {
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




});
