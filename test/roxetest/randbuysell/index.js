const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');
let env = dotenv.config({})
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);
console.log(env);

const debug = require("debug");
const randbuysell = debug('randbuysell');
const verbose = debug('verbose');
// debug.enable("*");

const sleep = require('sleep');
const { Api, JsonRpc, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')
const keys = process.env.KEYS ||[];
const msg_senderss = process.env.MSG_SENDERS ||[];
console.log(keys,msg_senders);
const defaultPrivateKey = process.env.EOS_KEY || "5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN";
const defaultPrivateKey2 = process.env.EOS_KEY2 || "5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey, defaultPrivateKey2])
// const rpc = new JsonRpc('http://172.17.3.161:7878', { fetch })

const protocol = process.env.EOS_PROTOCOL || "http";
const host = process.env.EOS_HOST || "172.17.3.161";
const port = process.env.EOS_PORT || "7878";
const rpc = new JsonRpc(protocol + '://' + host + ':' + port, { fetch })

const timer_ticker = process.env.TIMER_TICKER || '*/1 * * * * *'
const freq = process.env.FREQ || 500
const msg_sender1 = process.env.MSG_SENDER1 || "earntrader11";
const msg_sender2 = process.env.MSG_SENDER2 || "earntrader22";
const contract = process.env.CONTRACT || "roxe.earn";// "roxeearntest";//
const msg_senders = [msg_sender1, msg_sender2];//["bob111111111", "bob111111111"];//earntrader11
const dodo_names = ["re.usdgbp", "re.usdhkd"];//["usd2gbp44444", "usd2hkd44444"];//
const para_names = [["USD", "GBP"], ["USD", "HKD"]];
let counter = 0;
const min = process.env.MIN || 1;
const max = process.env.MAX || 10;
randbuysell("=====max====", max);
const token_contract = process.env.TOKEN_CONTRACT || "roxe.ro";




const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
})

const transactWithConfig = async (action, data) => await api.transact({
    actions: [{
        account: contract,
        name: action,
        authorization: [{
            actor: data[Object.keys(data)[0]],
            permission: 'active',
        }],
        data: data,
    }]
}, {
    blocksBehind: 3,
    expireSeconds: 30,
});

const to_asset = (value, sym) => {
    return { "quantity": value + " " + sym, contract: token_contract };
}

const logerror = async (msg) => {
    if (undefined != msg && msg.hasOwnProperty("processed") && msg.processed.hasOwnProperty("error_code") && msg.processed.error_code == null) {
        verbose(JSON.stringify(msg));
    }
    else {
        console.error(JSON.stringify(msg));
    }
}

const sendaction = async (action, data) => {
    try {
        const transactionResponse = await transactWithConfig("buybasetoken", data);
        logerror(transactionResponse)
    } catch (error) {
        console.error(error);
    }
}

const buy = async (msg_sender, dodo_name, amount, maxPayQuote) => {
    const data = { msg_sender, dodo_name, amount, maxPayQuote };
    // console.log(data);
    await sendaction("buybasetoken", data);

}

const sell = async (msg_sender, dodo_name, amount, minReceiveQuote) => {
    const data = { msg_sender, dodo_name, amount, minReceiveQuote };
    await transactWithConfig("sellbastoken", data);

}



const cron = require('node-cron')
async function runJob() {
    let task = cron.schedule(timer_ticker, async () => {
        const [amount, minreceive, maxpay] = await GetRandomNum(min, max);
        randbuysell(amount, counter++, new Date())
        let a = Number(amount);
        if (Number(a) == Number(0)) {
            a = 1;
        }
        while (Number(a) < Number(1)) {
            a *= Number(10);
        }
        const i = Math.round(a) % 2;
        const ii = (i + 1) % 2;

        sell(msg_senders[i], dodo_names[i], to_asset(amount, para_names[i][0]), to_asset(minreceive, para_names[i][1]));
        sleep.msleep(freq);
        buy(msg_senders[ii], dodo_names[ii], to_asset(amount, para_names[ii][0]), to_asset(maxpay, para_names[ii][1]));
    }, { scheduled: false })

    task.start()
    // task.stop()
    // task.destroy()
    // cron.validate('* * * * * *')


}



async function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    // randbuysell(Min, Max,Rand,Math.round(Rand * Range));
    // return (Number(Min) + Number(Math.round(Rand * Range)));
    const mrr = Number(Min) + Number(Rand * Range);
    const r = (mrr).toFixed(6);
    const minreceive = Number(Rand).toFixed(6);
    const maxpay = Number(mrr * 11).toFixed(6);
    return [r, minreceive, maxpay];
}


runJob()

