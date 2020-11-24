const { Api, JsonRpc, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const defaultPrivateKey = "5KS2QMfShmDjHaLAZEPJgehVXAobgo5YfVw1mzPBHaPpGfKbkZL";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey])
const rpc = new JsonRpc('http://47.91.226.192:7878', { fetch })

const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
})

const transactWithConfig = async () => await api.transact({
    actions: [{
        account: 'roxe.token',
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
    // console.log(111)
    // const transactionResponse = await transactWithConfig();
    // console.log(transactionResponse)
    // const blockInfo = await rpc.get_block(transactionResponse.processed.block_num - 3);
    // console.log(blockInfo)

    const res = await rpc.get_table_rows({
    code:'eosdoseosdos',
    table:'dodos',
    scope:'eosdoseosdos'
  });

    console.log(JSON.stringify(res));
{
  const res = await rpc.get_table_rows({
    code:'eosdoseosdos',
    table:'oracles',
    scope:'eosdoseosdos'
  });

 console.log(JSON.stringify(res));
}

}
transactWithoutConfig()

