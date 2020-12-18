
import {DosClient,rpc} from "../../dodo/dodo_client"

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
        // const expPath = '/v1/history/get_transaction';
        const id = 'myaccountaaa';
        const blockNumHint: number = null;
        const expReturn = { data: '12345' };
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




});
