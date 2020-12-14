const { Api, JsonRpc, Serialize, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const defaultPrivateKey = "5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey, "5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8"])
const rpc = new JsonRpc('http://172.17.3.161:8888', { fetch })
const { prettyJson } = require("./prettyjson");

const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
})

const transactWithConfig = async () => await api.transact({
    actions: [{
        account: 'eoswap',
        name: 'transfer',
        authorization: [{
            actor: 'defi',
            permission: 'active',
        }],
        data: {
            from: 'defi',
            to: 'roxe',
            quantity: '0.0001 ROC',
            memo: '',
        },
    }]
}, {
    blocksBehind: 3,
    expireSeconds: 30,
});

const transactWithoutConfig = async () => {
    console.log(111)
    const transactionResponse = await transactWithConfig();
    console.log(transactionResponse)
    const blockInfo = await rpc.get_block(transactionResponse.processed.block_num - 3);
    console.log(blockInfo)
}
// transactWithoutConfig()


const fs = require('fs')

async function deployContract(user_name) {
    // const wasmFilePath = './wasms/eoswap/eoswap.wasm'
    // const abiFilePath = './wasms/eoswap/eoswap.abi'

    const wasmFilePath = './wasms/eoswap/eoswap.wasm'
    const abiFilePath = './wasms/eoswap/eoswap.abi'

    const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex')

    const buffer = new Serialize.SerialBuffer({
        textEncoder: api.textEncoder,
        textDecoder: api.textDecoder,
    })

    let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf8'))
    const abiDefinitions = api.abiTypes.get('abi_def')
    abiJSON = abiDefinitions.fields.reduce(
        (acc, { name: fieldName }) =>
            Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
        abiJSON
    )
    abiDefinitions.serialize(buffer, abiJSON)
    let serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex')

    try {
        const res = await api.transact(
            {
                actions: [
                    {
                        account: 'roxe',
                        name: 'setcode',
                        authorization: [
                            {
                                actor: user_name,
                                permission: 'active',
                            },
                        ],
                        data: {
                            account: user_name,
                            vmtype: '0',
                            vmversion: '0',
                            code: wasmHexString,
                        },
                    },
                    {
                        account: 'roxe',
                        name: 'setabi',
                        authorization: [
                            {
                                actor: user_name,
                                permission: 'active',
                            },
                        ],
                        data: {
                            account: user_name,
                            abi: serializedAbiHexString,
                        },
                    },
                ],
            },
            {
                blocksBehind: 3,
                expireSeconds: 30,
            }
        )
        prettyJson(res);
    }
    catch (e) {
        console.log(JSON.stringify(e))
    }
}

// createNewAccount("gbp2usd11111", pub_key, pub_key);
// createNewAccount("hkd2usd11111", pub_key, pub_key);
// deployContract("gbp2usd11111");
deployContract("eoswapeoswap");
