const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');

let env = dotenv.config({})
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);

dotenv.load();

export class Swap {
    static interval = process.env.FREQ;
    static owner = process.env.ADMIN;
    static swapContract = process.env.CONTRACT;

    static bp = "roxe1";
    static nonadmin = "alice1111111";
    static user1 = "bob111111111";
    static admin = "roxeswap1213";
    static tokenowner = "roxearntoken";
    static tokenissuer = "tokenissuer1";
    static acc2pub_keys: any = {
        "roxe1": "ROXE6m2TpGWE59yDPWuBaB3xSJSgYWkggzSTuDv5vLfS3hYzB6UTU2",
        "roxeswap1213": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "roxearntoken": "ROXE5rM2nqtmCqyeRMpmQQMVTMYYZ9VYq9JDgve4t3Gzy6gVU1wB1z",
        "tokenissuer1": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "btc2usd33333": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "alice1111111": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "bob111111111": "ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX",
        "carol1111111": "ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX",
        "112acnogsedo": "ROXE7Bm8LAeVXTD1XMvRmj3gG4o89uySacRRvuSEQJxHBkKiiU1pZY",
        "1114wmpblocm": "ROXE7DUJAgEwxbmY2ReM8rQVTjgw83AxaRrBvoc4fauxTSenMmaQhg"
    };

    static keys = [process.env.EOS_KEY,
        "5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w",
        "5JxT1aA8MiZZe7XjN3SYaQ65NSbZXrBcjePaSwRifK7jJLdjSf3",
        "5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8",
        "5HwYSQMW2Xy37Q9nhdKz7T32eLxwbDq29rMzGXrRQJwveh9B7sG",
        "5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN",
        "5KQkb4xcjWfNvvotM6JspVpupddbPCj62SvTTUTKeLhHmfuH3Zp",
        "5JyL5XytgZSdDK3DR2snUX5wVEGD7Jg7mXcVNq7tNgQL5T4DxC9"];

}

export class BTC2USD_PAIR_DATA {
    static PAIR = { token1: "BTC", token2: "USD" };
    static POOL_NAME = "btc2usd33333";
    static pairpara = {
        currentPool: BTC2USD_PAIR_DATA.POOL_NAME,
        token1: BTC2USD_PAIR_DATA.PAIR.token1,
        token2: BTC2USD_PAIR_DATA.PAIR.token2,
        newaccdata: {
            newuser: BTC2USD_PAIR_DATA.POOL_NAME,
            pub_key: "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"
        },
        mintdata: {
            users: [Swap.nonadmin, Swap.user1],
            tokens: [[10000, BTC2USD_PAIR_DATA.PAIR.token1], [20000000, BTC2USD_PAIR_DATA.PAIR.token2]]
        },
        binddata:
        {
            token1: { amount: 10000, denorm: 5 },
            token2: { amount: 200000000, denorm: 5 }
        },
        joinpooldata: 90,
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
    }
}
