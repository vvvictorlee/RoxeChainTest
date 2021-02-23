const dotenv = require('dotenv');

let env = dotenv.config({})
if (env.error) throw env.error;

dotenv.load();

export class Dos {
    static interval = process.env.FREQ;
    static owner = process.env.ADMIN;
    static dosContract = "roxe.earn";//process.env.DOS_CONTRACT;
    static ONE_DECIMALS = 6;
    static TOKEN_CONTRACT = "roxe.ro";

    //const      doowner            = "dodoowner111";
    static bp = "roxe1";
    static trader = "bob111111111";
    static hexuser = "carol1111111";
    static testadmin = "roxeearntest";
    static prodadmin = "roxe.earn";
    static admin = Dos.prodadmin;//"roxeearn1231";
    static lp = Dos.prodadmin;
    static tokenowner = "roxe.ro";
    static tokenissuer = "tokenissuer1";
    static maintainer = "maintainer11";
    static oracleadmin = "orc.polygon";
    static doowner = Dos.admin;
    static dodo_ethbase_name = "ethbasemkr11";
    static dodo_ethquote_name = "ethquotemkr1";
    static dodo_stablecoin_name = "dai2mkr11111";//daimkrdaimkr
    static dodo_u2g_name = "re.usdgbp";
    static dodo_u2h_name = "re.usdhkd";
    static dodo_g2h_name = "re.gpbhkd";
    static contract = "roxe.earn";
    static filePath = '../wasms/roxe.token/roxe.token';
    static dosfilePath = '../wasms/0123/eosdos/eosdos';
    static para: { [name: string]: any } = {
        util_para: {
            TOKEN_CONTRACT: "roxe.ro",
            ONE_DECIMALS: 6,
            sym2dec: { "USD": 6, "GBP": 6, "HKD": 6, "ROC": 4 },
            MAX_SUPPLY: "10000000000"
        },
        client_para: {
            abiname: "earn",
            contract: Dos.contract,
            acc2pub_keys: {
                "orc.polygon": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
                "roxe.earn": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
                "roxe1": "ROXE6m2TpGWE59yDPWuBaB3xSJSgYWkggzSTuDv5vLfS3hYzB6UTU2",
                "roxeearnprod": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
                "re.usdgbp": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
                "re.usdhkd": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
                "earntrader11": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH",
                "earntrader22": "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"
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

    static USD2GBP_BASE = { tokens: ["USD", "GBP"], DODO_NAME: "re.usdgbp" };
    static USD2GBP: { [name: string]: any } = {
        base: Dos.USD2GBP_BASE,
        newaccdata: {
            newuser: Dos.USD2GBP_BASE.DODO_NAME,
            pub_key: "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"
        },
        mintdata: {
            users: [Dos.lp, Dos.trader],
            tokens: [[1000000, Dos.USD2GBP_BASE.tokens[0]], [740000, Dos.USD2GBP_BASE.tokens[1]]]
        },
        depositdata:
        {
            baseamount: 952,
            quoteamount: 700
        },
       withdrawdata:
        {
            baseamount: 1300000000,
            quoteamount: 1200000000
        },
        lpFeeRate: 595,
        mtFeeRate: 105,
        k: 100,
        oracleprice: 740000,
        buydata: {
            amount: 1323603731,
            maxPay: 1000
        },
        selldata: {
            amount: 998500000,
            minReceive: 728900000
        },   
        sellquote: {
            minReceive: 1000,
            amount: 1323603731
        }
    };

    static USD2HKD_BASE = { tokens: ["USD", "HKD"], DODO_NAME: "re.usdhkd" };
    static USD2HKD: { [name: string]: any } = {
        base: Dos.USD2HKD_BASE,
        newaccdata: {
            newuser: Dos.USD2HKD_BASE.DODO_NAME,
            pub_key: "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"
        },
        mintdata: {
            users: [Dos.lp, Dos.trader],
            tokens: [[1000000, Dos.USD2HKD_BASE.tokens[0]], [7750000, Dos.USD2HKD_BASE.tokens[1]]]
        },
        depositdata:
        {
            baseamount: 904,
            quoteamount: 7000
        },
       withdrawdata:
        {
            baseamount: 1300000000,
            quoteamount: 1200000000
        },
        lpFeeRate: 680,
        mtFeeRate: 120,
        k: 100,
        oracleprice: 7750000,
        buydata: {
            amount: 1,
            maxPay: 10
        },
        selldata: {
            amount: 1,
            minReceive: 1
        }
    };

    static GBP2HKD_BASE = { tokens: ["GBP", "HKD"], DODO_NAME: "gbp2hkd55555" };
    static GBP2HKD: { [name: string]: any } = {
        base: Dos.GBP2HKD_BASE,
        newaccdata: {
            newuser: Dos.GBP2HKD_BASE.DODO_NAME,
            pub_key: "ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"
        },
        mintdata: {
            users: [Dos.lp, Dos.trader],
            tokens: [[740000, Dos.GBP2HKD_BASE.tokens[0]], [7750000, Dos.GBP2HKD_BASE.tokens[1]]]
        },
        depositdata:
        {
            baseamount: 740000,
            quoteamount: 7750000
        },
       withdrawdata:
        {
            baseamount: 1300000000,
            quoteamount: 1200000000
        },
        lpFeeRate: 595,
        mtFeeRate: 105,
        k: 100,
        oracleprice: 10472973,
        buydata: {
            amount: 1,
            maxPay: 15
        },
        selldata: {
            amount: 1,
            minReceive: 1
        }
    };


}