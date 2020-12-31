
import { DosClient } from "../../dodo/dodo_client"
import { prettyJson } from "../../lib/prettyjson";
import { Dos } from "../../dodo/client_data_test";

describe('JSON RPC', () => {
    // const endpointExtraSlash = 'http://localhost/';
    // const endpoint = 'http://localhost';
    // const fetchMock = fetch as any;
    // let jsonRpc: JsonRpc;
    let rpc: any;
    let client = new DosClient(Dos.USD2GBP, Dos.para);

    beforeEach(() => {
        rpc = client.common_client.para.rpc;
        // fetchMock.resetMocks();
        // jsonRpc = new JsonRpc(endpointExtraSlash);
    });


    it('dodos', async () => {
        const code = "roxeearntest"
        const res = await rpc.get_table_rows({
            code: code,
            table: 'dodos',
            scope: code,
            reverse: true
        });
        prettyJson(res);

        {
            const res = await rpc.get_table_rows({
                code: code,
                table: 'oracleprices',
                scope: code,
                reverse: true
            });
            prettyJson(res);
        }

    });


    it('get_transaction', async () => {

        // const expPath = '/v1/history/get_transaction';
        const id = '2eed5f9da4090956d7bc779618c69424a954a0f935048e67b463efabd2ce82c4';
        // const blockNumHint: number = null;
        const expReturn = { data: '2eed5f9da4090956d7bc779618c69424a954a0f935048e67b463efabd2ce82c4' };
        // const expParams = {
        //     body: JSON.stringify({
        //         id,
        //         block_num_hint: blockNumHint,
        //     }),
        //     method: 'POST',
        // };

        // fetchMock.once(JSON.stringify(expReturn));

        const response = await rpc.history_get_transaction(id);

        expect(response).toEqual(expReturn);
        // expect(fetch).toBeCalledWith(endpoint + expPath, expParams);
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


    it('get_actions', async () => {
        const accountName = "roxeearntest";
        const offset = 10;
        let pos = 0;

        for (let i = 0; i < 3; ++i) {
            const response = await rpc.history_get_actions(accountName, pos, offset);
            console.log("response.actions.length==",response.actions.length);
            pos+=offset;
prettyJson(response);
            // const expReturn = { };
            // expect(response).toEqual(expReturn);
        }

    });




});
