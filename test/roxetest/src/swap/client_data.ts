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
    static admin = "eoswapeoswap";
    static tokenowner = "eoswapxtoken";
    static pool = "pool";
    static pool1 = "pool1";
    static pool2 = "pool2";
    static pool3 = "pool3";
    static pool4 = "pool4";
    static pool5 = "pool5";

    static acc2pub_keys: any = {
        "roxe1": "ROXE6m2TpGWE59yDPWuBaB3xSJSgYWkggzSTuDv5vLfS3hYzB6UTU2",
        "eoswapeoswap": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "eoswapxtoken": "ROXE5rM2nqtmCqyeRMpmQQMVTMYYZ9VYq9JDgve4t3Gzy6gVU1wB1z",
        "alice1111111": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "bob111111111": "ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX",
        "carol1111111": "ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX",
        "112acnogsedo": "ROXE7Bm8LAeVXTD1XMvRmj3gG4o89uySacRRvuSEQJxHBkKiiU1pZY"
    };

    static keys = [process.env.EOS_KEY,
        "5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w",
        "5JxT1aA8MiZZe7XjN3SYaQ65NSbZXrBcjePaSwRifK7jJLdjSf3",
        "5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8",
        "5HwYSQMW2Xy37Q9nhdKz7T32eLxwbDq29rMzGXrRQJwveh9B7sG",
        "5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN", "5KQkb4xcjWfNvvotM6JspVpupddbPCj62SvTTUTKeLhHmfuH3Zp"];

}