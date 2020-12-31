
import { DosClient } from "../../dodo/dodo_client"
import { AbiJson } from "../../lib/abijson";
import { Dos } from "../../dodo/client_data_prod";

describe('usd2gbpeosjs-api', () => {
    let client: any;

    beforeEach(() => {
        client = new DosClient(Dos.USD2HKD, Dos.para);
        // rpc = new JsonRpc('', { fetch });
        // const signatureProvider = new JsSignatureProvider(['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr']);
        // const chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca';
        // api = new Api({
        //     rpc, signatureProvider, chainId, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()
        // });
    });

    it('deployContract', async () => {
        await client.deployContract();
    });
    it('depositbasequote', async () => {
        await client.depositbasequote();
    });
    it('newdodo', async () => {
        await client.newdodo();
    });
    it('paraenable', async () => {
        await client.enable();
    });
    it('paraenable2', async () => {
        await client.enable2();
    });
    it('paraenable3', async () => {
        await client.enable3();
    });
  
   it('allowContracts', async () => {
        await client.common_client.allowContracts();
    });



});


