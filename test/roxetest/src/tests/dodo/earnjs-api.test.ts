
import { DosClient } from "../../dodo/dodo_client"
import { AbiJson } from "../../lib/abijson";
import { Dos } from "../../dodo/client_data_prod";

describe('eosjs-api', () => {
    let client: any;

    beforeEach(() => {
        client = new DosClient(Dos.USD2GBP, Dos.para);
        // rpc = new JsonRpc('', { fetch });
        // const signatureProvider = new JsSignatureProvider(['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr']);
        // const chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca';
        // api = new Api({
        //     rpc, signatureProvider, chainId, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()
        // });
    });

    it('extransfer', async () => {
        await client.extransfer();
    });
    it('newacc', async () => {
        await client.newacc();
    });
    it('newdodoacc', async () => {
        await client.common_client.newacc(Dos.admin);
    });
    it('deployContract', async () => {
        await client.deployContract();
    });
    it('newtoken', async () => {
        await client.newtoken();
    });
    it('mint', async () => {
        await client.mint();
    });
    it('newdodo', async () => {
        await client.newdodo();
    });
    it('enable', async () => {
        await client.enable();
    });
    it('setprice', async () => {
        await client.setprice();
    });
    it('setparameter', async () => {
        await client.setparameter();
    });
    it('setkparameter', async () => {
        await client.setkparameter();
    });

    it('buybt', async () => {
        await client.buybt();
    });
    it('sellbt', async () => {
        await client.sellbt();
    });
    it('buyfakebt', async () => {
        await client.buyfakebt();
    });
    it('buydecbt', async () => {
        await client.buydecbt();
    });
    it('initproxy', async () => {
        await client.initproxy();
    });


});
