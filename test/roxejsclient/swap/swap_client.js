const Roxe = require('roxejs');
const dotenv = require('dotenv');
require("./client_data");
require("./client_util");
// dotenv.load();


const { Api, JsonRpc, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const defaultPrivateKey = [process.env.EOS_KEY, '5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w', '5JxT1aA8MiZZe7XjN3SYaQ65NSbZXrBcjePaSwRifK7jJLdjSf3', '5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8', '5HwYSQMW2Xy37Q9nhdKz7T32eLxwbDq29rMzGXrRQJwveh9B7sG', '5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN', '5K79wAY8rgPwWQSRmyQa2BR8vPicieJdLCXL3cM5Db77QnsJess', "5K2L2my3qUKqj67KU61cSACoxgREkqGFi5nKaLGjbAbbRBYRq1m", "5JN8chYis1d8EYsCdDEKXyjLT3QmpW7HYoVB13dFKenK2uwyR65", "5Kju7hDTh3uCZqpzb5VWAdCp7cA1fAiEd94zdNhU59WNaQMQQmE", "5K6ZCUpk2jn1munFdiADgKgfAqcpGMHKCoJUue65p99xKX9WWCW"];
const signatureProvider = new JsSignatureProvider(defaultPrivateKey)
const rpc = new JsonRpc('http://47.91.226.192:7878', { fetch })

const api = new Api({ 
    rpc, 
    signatureProvider, 
    textDecoder: new TextDecoder(), 
    textEncoder: new TextEncoder() 
})

// const roxe = Roxe({
//     httpEndpoint: process.env.EOS_PROTOCOL + "://" + process.env.EOS_HOST + ":" + process.env.EOS_PORT,
//     keyProvider: [process.env.EOS_KEY, '5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w', '5JxT1aA8MiZZe7XjN3SYaQ65NSbZXrBcjePaSwRifK7jJLdjSf3', '5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8', '5HwYSQMW2Xy37Q9nhdKz7T32eLxwbDq29rMzGXrRQJwveh9B7sG', '5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN', '5K79wAY8rgPwWQSRmyQa2BR8vPicieJdLCXL3cM5Db77QnsJess', "5K2L2my3qUKqj67KU61cSACoxgREkqGFi5nKaLGjbAbbRBYRq1m", "5JN8chYis1d8EYsCdDEKXyjLT3QmpW7HYoVB13dFKenK2uwyR65", "5Kju7hDTh3uCZqpzb5VWAdCp7cA1fAiEd94zdNhU59WNaQMQQmE", "5K6ZCUpk2jn1munFdiADgKgfAqcpGMHKCoJUue65p99xKX9WWCW"],
//     chainId: process.env.EOS_CHAIN,
//     verbose: false,
//     logger: {
//         log: null,
//         error: null
//     }
// });


class EosClient {
    constructor(pool_name) {
        this.poolName = pool_name;
    }
    allowSwapContract(user, pubk) {
        roxe.transaction(allowContract(user, pubk, swapContract));
    }

    allowSwapContracts() {
        this.allowSwapContract(admin, admin_pub);
        this.allowSwapContract(tokenowner, tokenowner_pub);
        this.allowSwapContract(nonadmin, pub);
        this.allowSwapContract(user1, user1_pub);
    }

    async newtoken(token) {
        roxe.contract(swapContract)
            .then((contract) => {
                contract.newtoken({
                    msg_sender: admin,
                    token: token
                },
                    {
                        scope: swapContract,
                        authorization: [`${admin}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }

    async mint(user, amount) {
        roxe.contract(swapContract)
            .then((contract) => {
                contract.mint({
                    msg_sender: user,
                    amt: amount
                },
                    {
                        scope: swapContract,
                        authorization: [`${user}@${process.env.SWAP_PERMISSION || 'active'}`, `${admin}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }


    extransfer() {

        roxe.contract(swapContract)
            .then((contract) => {
                contract.extransfer({
                    from: nonadmin,
                    to: admin,
                    quantity: "1.0000 SYS@eosio.token",
                    memo: ""
                },
                    {
                        scope: swapContract,
                        authorization: [`${nonadmin}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }


    newpool() {
        roxe.contract(swapContract)
            .then((contract) => {
                contract.newpool({
                    msg_sender: admin,
                    pool_name: this.poolName
                },
                    {
                        scope: swapContract,
                        authorization: [`${admin}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }

    setswapfee() {
        roxe.contract(swapContract)
            .then((contract) => {
                contract.setswapfee({
                    msg_sender: admin,
                    pool_name: this.poolName,
                    swapFee: 3000
                },
                    {
                        scope: swapContract,
                        authorization: [`${admin}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }


    bind(balance) {
        roxe.contract(swapContract)
            .then((contract) => {
                contract.bind({
                    msg_sender: admin,
                    pool_name: this.poolName,
                    balance: balance,
                    denorm: to_wei(5)
                },
                    {
                        scope: swapContract,
                        authorization: [`${admin}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }

    finalize() {
        roxe.contract(swapContract)
            .then((contract) => {
                contract.finalize({
                    msg_sender: admin,
                    pool_name: this.poolName
                },
                    {
                        scope: swapContract,
                        authorization: [`${admin}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }


    joinpool(user) {
        roxe.contract(swapContract)
            .then((contract) => {
                contract.joinpool({
                    msg_sender: user,
                    pool_name: this.poolName,
                    poolAmountOut: to_wei(10),
                    maxAmountsIn: [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
                },
                    {
                        scope: swapContract,
                        authorization: [`${user}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }

    exitpool() {
        roxe.contract(swapContract)
            .then((contract) => {
                contract.exitpool({
                    msg_sender: nonadmin,
                    pool_name: this.poolName,
                    poolAmountIn: to_wei(10),
                    minAmountsOut: [0, 0]
                },
                    {
                        scope: swapContract,
                        authorization: [`${nonadmin}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }



    collect() {

        roxe.contract(swapContract)
            .then((contract) => {
                contract.collect({
                    msg_sender: admin,
                    pool_name: this.poolName
                },
                    {
                        scope: swapContract,
                        authorization: [`${admin}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }

    swapamtin(user) {
        roxe.contract(swapContract)
            .then((contract) => {
                contract.swapamtin({
                    msg_sender: user,
                    pool_name: this.poolName,
                    tokenAmountIn: to_asset(250, "WETH"),
                    minAmountOut: to_wei_asset(475, "DAI"),
                    maxPrice: to_wei(200)
                },
                    {
                        scope: swapContract,
                        authorization: [`${user}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }
    swapamtout(user) {

        roxe.contract(swapContract)
            .then((contract) => {
                contract.swapamtout({
                    msg_sender: user,
                    pool_name: this.poolName,
                    maxAmountIn: to_wei_asset(3, "WETH"),
                    tokenAmountOut: to_wei_asset(1, "MKR"),
                    maxPrice: to_wei(500)
                },
                    {
                        scope: swapContract,
                        authorization: [`${user}@${process.env.SWAP_PERMISSION || 'active'}`]
                    })
                    .then(results => {
                        console.log(__line); console.log("results:", results);
                    })
                    .catch(error => {
                        console.log(__line); console.log("error:", error);
                    });
            })
            .catch(error => {
                console.log(__line); console.log("error:", error);
            });
    }

}

var arguments = process.argv.splice(2);
console.log(__line); console.log('所传递的参数是：', arguments);

//////////////////////////
// print process.argv
process.argv.forEach(function (val, index, array) {
    console.log(__line); console.log(index + ': ' + val);
});

const client = new EosClient(pool);
const client1 = new EosClient(pool1);

let handlers = {
    "a": (async function () {
        client.allowSwapContracts();
    }),
    "n": (async function () {
        await client.newtoken(to_max_supply("WETH"));
        await client.newtoken(to_max_supply("DAI"));
    }),
    "m": (async function () {
        await client.mint(admin, to_wei_asset(5, "WETH"));
        await client.mint(admin, to_wei_asset(200, "DAI"));
        await client.mint(nonadmin, to_wei_asset(1, "WETH"));
        await client.mint(nonadmin, to_wei_asset(200, "DAI"));
    }),
    "p": (async function () {
        client.newpool();
    }),
    "s": (async function () {
        client.setswapfee();
    }),
    "b": (async function () {
        client.bind(to_wei_asset(5, "WETH"));
        client.bind(to_wei_asset(200, "DAI"));
    }),
    "f": (async function () {
        client.finalize();
    }),
    "j": (async function () {
        client.joinpool(nonadmin);
    }),
    "x": (async function () {
        client.exitpool();
    }),
    "c": (async function () {
        client.collect();
    }),
    "i": (async function () {
        client1.swapamtin(user1);
    }),
    "o": (async function () {
        client1.swapamtout(user1);
    }),
    "e": (async function () {
        logTime(client.extransfer)();
    }),
    "B": (async function () {
        await client1.newtoken(to_max_supply("WETH"));
        await client1.newtoken(to_max_supply("MKR"));
        await client1.newtoken(to_max_supply("DAI"));
        await client1.newtoken(to_max_supply("XXX"));

        await client1.mint(admin, to_wei_asset(50, "WETH"));

        await client1.mint(admin, to_wei_asset(200, "MKR"));

        await client1.mint(admin, to_wei_asset(10000, "DAI"));

        await client1.mint(admin, to_wei_asset(10, "XXX"));

        await client1.mint(user1, to_wei_asset(25, "WETH"));

        await client1.mint(user1, to_wei_asset(4, "MKR"));

        await client1.mint(user1, to_wei_asset(40000, "DAI"));

        await client1.mint(user1, to_wei_asset(10, "XXX"));

        client1.newpool();

        client1.setswapfee();

        client1.bind(to_wei_asset(50, "WETH"));

        client1.bind(to_wei_asset(20, "MKR"));

        client1.bind(to_wei_asset(10000, "DAI"));

        client1.finalize();

        client1.joinpool(user1);
    }),
    "default": (async function () {
        console.log(__line); console.log("test option");
    })

};

// console.log(__line);console.log(process.argv);
const f = handlers[arguments[0]] || handlers["default"];
f();
