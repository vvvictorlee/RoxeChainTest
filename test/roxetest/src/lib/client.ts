import { AbiJson } from "./abijson";
import { buyram, createNewAccount, deployContract } from "./api_utils";
import { ClientUtil } from "./client_util";
import { TxUtil } from "./tx_util";
// import { Swap, BTC2USD,ETH2USD_PAIR_DATA } from "./client_data";
import { prettyJson } from "./prettyjson";
const { deployContractjs } = require('../lib/deployContract_api_utils')

// const jq = require('node-jq');
const { Api, JsonRpc, Serialize, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')




const dotenv = require('dotenv');
dotenv.load();
// node only; not needed in browsers
const protocol = process.env.EOS_PROTOCOL || "http";
const host = process.env.EOS_HOST || "172.17.3.161";
const port = process.env.EOS_PORT || "7878";




// # http://10.100.1.10:8889/v1/wallet/list_wallets



export class Client {

    para: { [name: string]: any } = { contract: {}, acc2pub_keys: [], keys: [] };

    constructor(para: any) {
        AbiJson.setabi(para.abiname);
        this.para = para;
        this.para.signatureProvider = new JsSignatureProvider(para.keys)

        this.para.rpc = new JsonRpc(protocol + '://' + host + ':' + port, { fetch })

        // const rpc = new JsonRpc('http://172.17.3.161:8888', { fetch })

        this.para.api = new Api({
            rpc: this.para.rpc,
            signatureProvider: this.para.signatureProvider,
            textDecoder: new TextDecoder(),
            textEncoder: new TextEncoder()
        })

        this.para.utils = { api: this.para.api, Serialize: Serialize };

    }

    transactWithConfig = async (actionjson: any) => {

        const results = await this.para.api.transact(actionjson, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        // const blockInfo = await rpc.get_block(results.processed.block_num - 3);
        // console.log(blockInfo);
        return results;
    };

    pushTransaction = async (account: any, action: any, data: any) => {
        let results = {};
        try {
            const json = TxUtil.pushAction(this.para.contract, account, this.para.acc2pub_keys[account], action, data);
            await prettyJson(json);
            results = await this.transactWithConfig(json);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            results = error;
        }

        return results;
    }

    pushAction = async (action: any, ...restOfPara: any[]) => {
        const account = restOfPara[0];
        const data = await AbiJson.buildActionParameterJson(action, ...restOfPara);
        const results = await this.pushTransaction(account, action, data);
        await prettyJson(results);
        return results;
    }

    async allowContract(user: any, pubk: any) {
        const results = await this.transactWithConfig(TxUtil.allowContract(user, pubk, this.para.contract));
        await prettyJson(results);
    }

    async allowContracts() {
        const accounts = Object.keys(this.para.acc2pub_keys);
        for (let acc of accounts) {
            await this.allowContract(acc, this.para.acc2pub_keys[acc]);
        }
    }

    async newacc(newuser: any) {
        // const newuser = this.para.newaccdata.newuser;
        const pub_key = this.para.acc2pub_keys[newuser];
        await createNewAccount(newuser, pub_key, pub_key, this.para.api);
    }

    async deployContract(contractuser: any, filePath: any) {
        const result = await deployContractjs(contractuser, filePath, this.para.utils);
        return result;
    }

    async newtoken(issuer: any, tokens: any) {
        for (let t of tokens) {
            await this.pushAction("newtoken", issuer, ClientUtil.to_max_supply(t));
        }
    }

    async mint(users: any, tokens: any) {
        // const users = this.para.mintdata.users;//[this.para.admin, "112acnogsedo", "1114wmpblocm"];
        // const tokens = this.para.mintdata.tokens;
        for (let u of users) {
            for (let t of tokens) {
                await this.pushAction("mint", u, ClientUtil.to_wei_asset(t[0], t[1]));
            }
        }
    }


}