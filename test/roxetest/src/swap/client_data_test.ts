const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');

let env = dotenv.config({})
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);

dotenv.load();

export class Swap {
    static interval = process.env.FREQ;
    static owner = process.env.ADMIN;
    static bp = "roxe1";
    static nonadmin = "alice1111111";
    static user1 = "bob111111111";
    static admin = "roxeswaptest";
    static tokenowner = "roxe.ro";
    static tokenissuer = "tokenissuer1";
    static contract = "roxeswaptest";
    static filePath = '../wasms/roxe.token/roxe.token';
    static swapfilePath = '../wasms/eoswap/eoswap';
    static para: { [name: string]: any } = {
        util_para: {
            TOKEN_CONTRACT: "roxe.ro",
            ONE_DECIMALS: 9,
            sym2dec: { "USD": 6, "BTC": 8, "ROC": 4 },
            MAX_SUPPLY: "10000000000"
        },
        client_para: {
            abiname: "swap",
            contract: Swap.contract,
            acc2pub_keys: {
                "roxe1": "ROXE6m2TpGWE59yDPWuBaB3xSJSgYWkggzSTuDv5vLfS3hYzB6UTU2",
                "roxeswaptest": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
                "roxe.ro": "ROXE5rM2nqtmCqyeRMpmQQMVTMYYZ9VYq9JDgve4t3Gzy6gVU1wB1z",
                "tokenissuer1": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
                "btc2usd44444": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
                "alice1111111": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
                "bob111111111": "ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX",
                "carol1111111": "ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX",
                "112acnogsedo": "ROXE7Bm8LAeVXTD1XMvRmj3gG4o89uySacRRvuSEQJxHBkKiiU1pZY",
                "1114wmpblocm": "ROXE7DUJAgEwxbmY2ReM8rQVTjgw83AxaRrBvoc4fauxTSenMmaQhg"
            },
            keys: [process.env.EOS_KEY,
                "5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w",
                "5JxT1aA8MiZZe7XjN3SYaQ65NSbZXrBcjePaSwRifK7jJLdjSf3",
                "5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8",
                "5HwYSQMW2Xy37Q9nhdKz7T32eLxwbDq29rMzGXrRQJwveh9B7sG",
                "5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN",
                "5KQkb4xcjWfNvvotM6JspVpupddbPCj62SvTTUTKeLhHmfuH3Zp",
                "5JyL5XytgZSdDK3DR2snUX5wVEGD7Jg7mXcVNq7tNgQL5T4DxC9"]
        }
    };
    static tokens = [["BTC", "USD"]];
    static POOL_NAMES = ["btc2usd44444"];
    static PAIR_INDEX = 0;
    static BTC2USD_PAIR_DATA: { [name: string]: any } = {
        currentPool: Swap.POOL_NAMES[Swap.PAIR_INDEX],
        tokens: Swap.tokens[Swap.PAIR_INDEX],
        newaccdata: {
            newuser: Swap.POOL_NAMES[Swap.PAIR_INDEX],
            pub_key: "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"
        },
        mintdata: {
            users: [Swap.nonadmin, Swap.user1],
            tokens: [[10000, Swap.tokens[Swap.PAIR_INDEX][0]], [20000000, Swap.tokens[Swap.PAIR_INDEX][1]]]
        },
        binddata:
            [
                [10000, Swap.tokens[Swap.PAIR_INDEX][0], 5],
                [200000000, Swap.tokens[Swap.PAIR_INDEX][1], 5]
            ],
        joinpooldata: 10,
        exitpooldata: 10,
        swapfee: 1000000,
        pubswap: true,
        swapindata: {
            user: Swap.user1,
            tokenAmountIn: 210000,
            minAmountOut: 400,
            maxPrice: 200
        },
        swapoutdata: {
            user: Swap.user1,
            maxAmountIn: 4000000000,
            tokenAmountOut: 2100000,
            maxPrice: 50000
        }
    };

}

