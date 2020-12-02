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


export class U2G_PAIR_DATA {
    static PAIR = { base: "USD", quote: "GBP" };
    static DODO_NAME="usd2gbp22222";
    static pairpara = {
        currentDodo: U2G_PAIR_DATA.DODO_NAME,
        currentbasestr: U2G_PAIR_DATA.PAIR.base,
        currentquotestr: U2G_PAIR_DATA.PAIR.quote,
        currentLp: Dos.lp,
        currentTrader: Dos.trader,
        newaccdata: {
            newuser: U2G_PAIR_DATA.DODO_NAME,
            pub_key: "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"
        },
        mintdata: {
            users: [Dos.lp, Dos.trader],
            tokens: [[1000000, U2G_PAIR_DATA.PAIR.base], [750000, U2G_PAIR_DATA.PAIR.quote]]
        },
        depositdata:
        {
            baseamount: 1000000,
            quoteamount: 750000
        },
        lpFeeRate: 1,
        mtFeeRate: 0,
        k: 1,
        oracleprice: 7500,
        buydata: {
            amount: 1,
            maxPay: 10
        },
        selldata: {
            amount: 1,
            minReceive: 1
        }
    }
}

export class U2H_PAIR_DATA {
    static PAIR = { base: "USD", quote: "HKD" };
    static DODO_NAME="usd2hkd22222";
    static pairpara = {
        currentDodo: U2H_PAIR_DATA.DODO_NAME,
        currentbasestr: U2H_PAIR_DATA.PAIR.base,
        currentquotestr: U2H_PAIR_DATA.PAIR.quote,
        currentLp: Dos.lp,
        currentTrader: Dos.trader,
        newaccdata: {
            newuser: U2H_PAIR_DATA.DODO_NAME,
            pub_key: "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"
        },
        mintdata: {
            users: [Dos.lp, Dos.trader],
            tokens: [[1000000, U2H_PAIR_DATA.PAIR.base], [7750000, U2H_PAIR_DATA.PAIR.quote]]
        },
        depositdata:
        {
            baseamount: 1000000,
            quoteamount: 7750000
        },
        lpFeeRate: 1,
        mtFeeRate: 0,
        k: 1,
        oracleprice: 77500,
        buydata: {
            amount: 1,
            maxPay: 10
        },
        selldata: {
            amount: 1,
            minReceive: 1
        }
    }
}