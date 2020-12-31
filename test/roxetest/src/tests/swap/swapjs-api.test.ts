
import { SwapClient } from "../../swap/swap_client"
import { AbiJson } from "../../lib/abijson";
import { Swap } from "../../swap/client_data_test";


describe('eosjs-api', () => {
    let client: any;
    // let rpc: any;
    // const fetch = async (input: any, init: any): Promise<any> => ({
    //     ok: true,
    //     json: async () => {
    //         if (input === '/v1/chain/get_raw_code_and_abi') {
    //             return {
    //                 account_name: 'testeostoken',
    //                 abi: 'DmVvc2lvOjphYmkvMS4wAQxhY2NvdW50X25hbWUEbmFtZQUIdHJhbnNmZXIABARmcm9tDGFjY291bnRfbmFtZQJ0bwxhY2NvdW50X25hbWUIcXVhbnRpdHkFYXNzZXQEbWVtbwZzdHJpbmcGY3JlYXRlAAIGaXNzdWVyDGFjY291bnRfbmFtZQ5tYXhpbXVtX3N1cHBseQVhc3NldAVpc3N1ZQADAnRvDGFjY291bnRfbmFtZQhxdWFudGl0eQVhc3NldARtZW1vBnN0cmluZwdhY2NvdW50AAEHYmFsYW5jZQVhc3NldA5jdXJyZW5jeV9zdGF0cwADBnN1cHBseQVhc3NldAptYXhfc3VwcGx5BWFzc2V0Bmlzc3VlcgxhY2NvdW50X25hbWUDAAAAVy08zc0IdHJhbnNmZXLnBSMjIFRyYW5zZmVyIFRlcm1zICYgQ29uZGl0aW9ucwoKSSwge3tmcm9tfX0sIGNlcnRpZnkgdGhlIGZvbGxvd2luZyB0byBiZSB0cnVlIHRvIHRoZSBiZXN0IG9mIG15IGtub3dsZWRnZToKCjEuIEkgY2VydGlmeSB0aGF0IHt7cXVhbnRpdHl9fSBpcyBub3QgdGhlIHByb2NlZWRzIG9mIGZyYXVkdWxlbnQgb3IgdmlvbGVudCBhY3Rpdml0aWVzLgoyLiBJIGNlcnRpZnkgdGhhdCwgdG8gdGhlIGJlc3Qgb2YgbXkga25vd2xlZGdlLCB7e3RvfX0gaXMgbm90IHN1cHBvcnRpbmcgaW5pdGlhdGlvbiBvZiB2aW9sZW5jZSBhZ2FpbnN0IG90aGVycy4KMy4gSSBoYXZlIGRpc2Nsb3NlZCBhbnkgY29udHJhY3R1YWwgdGVybXMgJiBjb25kaXRpb25zIHdpdGggcmVzcGVjdCB0byB7e3F1YW50aXR5fX0gdG8ge3t0b319LgoKSSB1bmRlcnN0YW5kIHRoYXQgZnVuZHMgdHJhbnNmZXJzIGFyZSBub3QgcmV2ZXJzaWJsZSBhZnRlciB0aGUge3t0cmFuc2FjdGlvbi5kZWxheX19IHNlY29uZHMgb3Igb3RoZXIgZGVsYXkgYXMgY29uZmlndXJlZCBieSB7e2Zyb219fSdzIHBlcm1pc3Npb25zLgoKSWYgdGhpcyBhY3Rpb24gZmFpbHMgdG8gYmUgaXJyZXZlcnNpYmx5IGNvbmZpcm1lZCBhZnRlciByZWNlaXZpbmcgZ29vZHMgb3Igc2VydmljZXMgZnJvbSAne3t0b319JywgSSBhZ3JlZSB0byBlaXRoZXIgcmV0dXJuIHRoZSBnb29kcyBvciBzZXJ2aWNlcyBvciByZXNlbmQge3txdWFudGl0eX19IGluIGEgdGltZWx5IG1hbm5lci4KAAAAAAClMXYFaXNzdWUAAAAAAKhs1EUGY3JlYXRlAAIAAAA4T00RMgNpNjQBCGN1cnJlbmN5AQZ1aW50NjQHYWNjb3VudAAAAAAAkE3GA2k2NAEIY3VycmVuY3kBBnVpbnQ2NA5jdXJyZW5jeV9zdGF0cwAAAA===', // eslint-disable-line
    //             };
    //         }

    //         return transaction;
    //     },
    // });

    beforeEach(() => {
        client = new SwapClient(Swap.BTC2USD, Swap.para);
        // rpc = new JsonRpc('', { fetch });
        // const signatureProvider = new JsSignatureProvider(['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr']);
        // const chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca';
        // api = new Api({
        //     rpc, signatureProvider, chainId, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()
        // });
    });


    it('abitojson', async () => {
        const data = await AbiJson.buildActionParameterJson("cppool2table", "admin", "pool");
        // await prettyJson(data);
        console.log(JSON.stringify(data));

        // const expected = await api.getAbi('testeostoken');
        // const response = await rpc.getRawAbi('testeostoken');
        // const actual = api.rawAbiToJson(response.abi);

        // expect(actual).toEqual(expected);
    });

    it('newtestpool', async () => {
        await client.newtestpool("testpool1111");
    });

    it('extransfer', async () => {
        await client.extransfer();
    });

    it('newacc', async () => {
        await client.newacc();
    });

    it('deployContract', async () => {
        const result = await client.deployContract();
        console.log(result);
    });

    it('allowContracts', async () => {
        await client.common_client.allowContracts();
    });

    it('newtoken', async () => {
        await client.newtoken();
    });

    it('mint', async () => {
        await client.mint();
    });

    it('newpool', async () => {
        await client.newpool();
    });

    it('cppool2table', async () => {
        await client.cppool2table();
    });

    it('setswapfee', async () => {
        await client.setswapfee();
    });

    it('bind', async () => {
        await client.bind();
    });

    it('finalize', async () => {
        await client.finalize();
    });

    it('joinpool', async () => {
        await client.joinpool();
    });

    it('exitpool', async () => {
        await client.exitpool();
    });

    it('collect', async () => {
        await client.collect();
    });

    it('swapamtin', async () => {
        await client.swapamtin();
    });

    it('swapamtout', async () => {
        await client.swapamtout();
    });
});
