const { Api, JsonRpc, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const defaultPrivateKey = "5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey])
const rpc = new JsonRpc('http://172.17.3.161:8888', { fetch })
// const prettier = require("prettier");

// const prettyJson = async (log) => {
//     console.log(prettier.format(JSON.stringify(log), { semi: false, parser: "json" }));
//     // let jsonstr = await jq.run('.', JSON.stringify(log), { input: 'string', output: 'pretty' });
//     // console.log(JSON.stringify(log));
// };
const {prettyJson}  = require("./prettyjson");

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
    console.log(111)
    const transactionResponse = await transactWithConfig();
    console.log(transactionResponse)
    const blockInfo = await rpc.get_block(transactionResponse.processed.block_num - 3);
    console.log(blockInfo)
}
// transactWithoutConfig()



const buyram = async (
    account_name
) => {
    try {
        const result = await api.transact(
            {
                actions: [
                    {
                        account: 'roxe',
                        name: 'buyrambytes',
                        authorization: [
                            {
                                actor: 'roxe1',
                                permission: 'active',
                            },
                        ],
                        data: {
                            payer: 'roxe1',
                            receiver: account_name,
                            bytes: 81920,
                        },
                    }
                ],
            },
            {
                blocksBehind: 3,
                expireSeconds: 30,
            }
        );
        // console.log('transaction_id is : ', result.transaction_id);
        // return trans_id;
        prettyJson(result);
    } catch (err) {
        console.log('error is : ___', err);
    }
};



const createNewAccount = async (
    account_name,
    owner_publicKey,
    active_publicKey
) => {
    try {
        const result = await api.transact(
            {
                actions: [
                    {
                        account: 'roxe',
                        name: 'newaccount',
                        authorization: [
                            {
                                actor: 'roxe1',
                                permission: 'active',
                            },
                        ],
                        data: {
                            creator: 'roxe1',
                            name: account_name,
                            owner: {
                                threshold: 1,
                                keys: [
                                    {
                                        key: owner_publicKey,
                                        weight: 1,
                                    },
                                ],
                                accounts: [],
                                waits: [],
                            },
                            active: {
                                threshold: 1,
                                keys: [
                                    {
                                        key: active_publicKey,
                                        weight: 1,
                                    },
                                ],
                                accounts: [],
                                waits: [],
                            },
                        },
                    },
                    {
                        account: 'roxe',
                        name: 'buyrambytes',
                        authorization: [
                            {
                                actor: 'roxe1',
                                permission: 'active',
                            },
                        ],
                        data: {
                            payer: 'roxe1',
                            receiver: account_name,
                            bytes: 8192000,
                        },
                    },
                    {
                        account: 'roxe',
                        name: 'delegatebw',
                        authorization: [
                            {
                                actor: 'roxe1',
                                permission: 'active',
                            },
                        ],
                        data: {
                            from: 'roxe1',
                            receiver: account_name,
                            stake_net_quantity: '10000.0000 ROC',
                            stake_cpu_quantity: '10000.0000 ROC',
                            transfer: false,
                        },
                    },
                ],
            },
            {
                blocksBehind: 3,
                expireSeconds: 30,
            }
        );
        // console.log('transaction_id is : ', JSONresult);
        // return trans_id;
        prettyJson(result);
    } catch (err) {
        console.log('error is : ___', err);
    }
};

// buyram("roxe1");
// const pub_key = "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH";
// createNewAccount("gbp2usd11111", pub_key, pub_key);
// createNewAccount("hkd2usd11111", pub_key, pub_key);

// prettyJson("result");

//   account: 'roxe',
//         name: 'newaccount',
//         authorization: [
//           {
//             actor: 'roxe1',
//             permission: 'active',
//           },
//         ],
//         data: {
//           creator: 'roxe1',
//           newact: account_name, // <--- Field key changed from 'name'



// var eos = Eos({
//     keyProvider: '5K4KSyfjjQiacYegYvxiXCGmNgoDZPmkXb7zeHRLuYRZdNdvoHg',// private key
//     // httpEndpoint: 'https://nodes.get-scatter.com:443',
//     httpEndpoint: 'https://api.kylin-testnet.eospace.io:443',
//     // chainId: chain.sys,
//     chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
//     expireInSeconds: 120,
//   });



// Var creatoraccount = issmile12345 // main account
// Var newaccount = issmile11112 // new account
// Var newaccount_pubkey= "EOS5DVR32n1B9V1igptPMy4nNPVEPfrVDddfHa9fy97a1DdFvH3pP"//Public key of new account

// // Building transaction objects
// var res2  = await eos.transaction(tr => {
//     // New Account
//     tr.newaccount({
//         creator: creatoraccount,
//         name: newaccount,
//         owner: newaccount_pubkey,
//         active: newaccount_pubkey
//     })

//     // Refill RAM for new account
//     tr.buyrambytes({
//         payer: creatoraccount,
//         receiver: newaccount,
//         bytes: 8192
//     })

//     // Mortgage CPU and NET resources for new accounts
//     tr.delegatebw({
//         from: creatoraccount,
//         receiver: newaccount,
//         stake_net_quantity: '1.0000 DEV',
//         stake_cpu_quantity: '1.0000 DEV',
//         transfer: 0
//     })
// })

// console.log('test----res2>',res2)

