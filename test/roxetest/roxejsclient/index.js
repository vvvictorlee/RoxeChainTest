const { Api, JsonRpc, Serialize, RpcError } = require('roxejs')
const ecc = require('roxejs-ecc')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const defaultPrivateKey = "5KS2QMfShmDjHaLAZEPJgehVXAobgo5YfVw1mzPBHaPpGfKbkZL";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey])
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
}

// transactWithoutConfig()


var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);

//////////////////////////
// print process.argv
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

//     const users = ["114listvtuib","hkd2usd11111"];
const users = ["bob111111111"];


let handlers = {
    "do": (async function () {
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

    }),
    "acc": (async function () {
        for (let user of users) {
            const res = await rpc.get_account(user);

            prettyJson(res);
        }

    }),
    "abi": (async function () {
        for (let user of users) {
            const res = await rpc.get_raw_code_and_abi(user);

            // console.log(JSON.stringify(res));
            prettyJson(res);
        }
        for (let user of users) {
            const res = await rpc.get_abi(user);

            // console.log(JSON.stringify(res));
            prettyJson(res);
        }

    }),
    "scope": (async function () {
        const res = await rpc.get_table_by_scope({
            code: 'eoswapxtoken',
            table: 'stat'
        });
        prettyJson(res);

    }),
    "stat": (async function () {
        let res = await rpc.get_table_by_scope({
            code: 'eoswapxtoken',
            table: 'stat'
        });
        prettyJson(res);
        for (let r of res.rows) {
            res = await rpc.get_table_rows({
                code: 'eoswapxtoken',
                table: 'stat',
                scope: r.scope
            });
            prettyJson(res);
        }

    }),
    "token": (async function () {
        for (let user of users) {
            const res = await rpc.get_table_rows({
                code: "eoswapxtoken",
                table: "accounts",
                scope: user
            });
            console.log(user, "=====");
            prettyJson(res);
        }
    }),
    "pool": (async function () {
        const res = await rpc.get_table_rows({
            code: 'roxeswap1213',
            table: 'pools',
            scope: 'roxeswap1213'
        });
        prettyJson(res);
    }),
    "default": (async function () {
        console.log("test option");
    })

};

// console.log(process.argv);
const f = handlers[arguments[0]] || handlers["default"];
f();


