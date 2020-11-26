const { Api, JsonRpc, Serialize, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const defaultPrivateKey = "5KS2QMfShmDjHaLAZEPJgehVXAobgo5YfVw1mzPBHaPpGfKbkZL";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey])
const rpc = new JsonRpc('http://47.91.226.192:7878', { fetch })


const { prettyJson } = require("./prettyjson");

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

//     const res = await rpc.get_table_rows({
//         code: 'eosdoseosdos',
//         table: 'dodos',
//         scope: 'eosdoseosdos'
//     });
//    prettyJson(res);


//     {
//         const res = await rpc.get_table_rows({
//             code: 'eosdoseosdos',
//             table: 'oracles',
//             scope: 'eosdoseosdos'
//         });
// prettyJson(res);
//     }

    //     const users = ["gbp2usd11111","hkd2usd11111"];
    //     for(let user of users)
    //     {
    //         const res = await rpc.get_account( user);

    //         // prettyJson(res);
    //     }

    const users = ["alice1111111", "usd2gbp22222"];
    //     for(let user of users)
    //     {
    //     const res = await rpc.get_raw_code_and_abi(user);

    // // console.log(JSON.stringify(res));
    //         prettyJson(res);
    //     }
    // for (let user of users) {
    //     const res = await rpc.get_abi(user);

    //     // console.log(JSON.stringify(res));
    //     prettyJson(res);
    // }

   for (let user of users) {
       const res = await rpc.get_table_by_scope({
        code: 'usd2gbp22222',
        table: 'stat'
    });
        console.log(user,"=====");
        prettyJson(res);
    }

//    for (let user of users) {
//        const res = await rpc.get_table_rows({
//         code: 'usd2gbp11111',
//         table: 'stat',
//         scope: ".....l2nepbp2"
//     });
//         console.log(user,"=====");
//         prettyJson(res);
//     }


// {
//     const res = await rpc.get_table_rows({
//         code: 'eoswapeoswap',
//         table: 'tokenstore',
//         scope: 'eoswapeoswap'
//     });
//     prettyJson(res);
// }

}

transactWithoutConfig()

