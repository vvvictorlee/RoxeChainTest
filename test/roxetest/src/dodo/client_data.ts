const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');

let env = dotenv.config({})
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);

dotenv.load();

export class Dos {
    static interval = process.env.FREQ;
    static owner = process.env.ADMIN;
    static dosContract = process.env.DOS_CONTRACT;


    //cosnt      doowner            = "dodoowner111";
    static bp = "roxe1";
    static lp = "alice1111111";
    static trader = "bob111111111";
    static hexuser = "carol1111111";
    static admin = "eosdoseosdos";
    static tokenowner = "eosdosxtoken";
    static tokenissuer = "tokenissuer1";
    static maintainer = "maintainer11";
    static oracleadmin = "eosdosoracle";
    static doowner = Dos.admin;
    static dodo_ethbase_name = "ethbasemkr11";
    static dodo_ethquote_name = "ethquotemkr1";
    static dodo_stablecoin_name = "dai2mkr11111";//daimkrdaimkr
    static dodo_u2g_name = "usd2gbp11111";
    static dodo_u2h_name = "usd2hkd11111";

    static acc2pub_keys: any = {
        "roxe1": "ROXE6m2TpGWE59yDPWuBaB3xSJSgYWkggzSTuDv5vLfS3hYzB6UTU2",
        "eosdoseosdos": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "eosdosxtoken": "ROXE5rM2nqtmCqyeRMpmQQMVTMYYZ9VYq9JDgve4t3Gzy6gVU1wB1z",
        "eosdosoracle": "ROXE5rM2nqtmCqyeRMpmQQMVTMYYZ9VYq9JDgve4t3Gzy6gVU1wB1z",
        "ethbasemkr11": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "ethquotemkr1": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "daimkrdaimkr": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "dai2mkr11111": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "usd2gbp11111": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "usd2hkd11111": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "tokenissuer1": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "maintainer11": "ROXE6m2TpGWE59yDPWuBaB3xSJSgYWkggzSTuDv5vLfS3hYzB6UTU2",
        "alice1111111": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
        "bob111111111": "ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX",
        "carol1111111": "ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX"
    };


    static keys = [process.env.EOS_KEY,
        "5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w",
        "5JxT1aA8MiZZe7XjN3SYaQ65NSbZXrBcjePaSwRifK7jJLdjSf3",
        "5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8",
        "5HwYSQMW2Xy37Q9nhdKz7T32eLxwbDq29rMzGXrRQJwveh9B7sG",
        "5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN"];
}

export class Swap {
    static interval = process.env.FREQ;
    static owner = process.env.ADMIN;
    static swapContract = process.env.CONTRACT;

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
        "carol1111111": "ROXE6bYcFRBBLugKtxfkNxnyyrxUFV2LMGT3h9GcDisd6QYUyt2xfX"
    };

    static keys = [process.env.EOS_KEY,
        "5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w",
        "5JxT1aA8MiZZe7XjN3SYaQ65NSbZXrBcjePaSwRifK7jJLdjSf3",
        "5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8",
        "5HwYSQMW2Xy37Q9nhdKz7T32eLxwbDq29rMzGXrRQJwveh9B7sG",
        "5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN"];

}