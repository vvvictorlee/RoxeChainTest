const dotenv = require('dotenv');

let env = dotenv.config({})
if (env.error) throw env.error;
// const dotenvParseVariables = require('dotenv-parse-variables');
// env = dotenvParseVariables(env.parsed);

const  sleep = require('sleep');
const { Api, JsonRpc, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const defaultPrivateKey = process.env.EOS_KEY||"5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN";
const defaultPrivateKey2 = process.env.EOS_KEY2||"5JHFTcGiKFDXFR64voMJXnxWZUqBgaEAnqMiyjJzBLQn9tHhWA8";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey,defaultPrivateKey2])
// const rpc = new JsonRpc('http://172.17.3.161:7878', { fetch })

const protocol = process.env.EOS_PROTOCOL || "http";
const host = process.env.EOS_HOST || "172.17.3.161";
const port = process.env.EOS_PORT || "7878";
const rpc = new JsonRpc(protocol + '://' + host + ':' + port, { fetch })

const timer_ticker = process.env.TIMER_TICKER||'*/1 * * * * *'
const freq = process.env.FREQ||500

const contract = "roxe.earn";// "roxeearntest";//
const msg_senders = ["earntrader11", "earntrader22"];//["bob111111111", "bob111111111"];//earntrader11
const dodo_names = ["re.usdgbp", "re.usdhkd"];//["usd2gbp44444", "usd2hkd44444"];//
const para_names = [["USD", "GBP"], ["USD", "HKD"]];
let counter = 0;
const min = 1;
const max = 10;
const token_contract = "roxe.ro";




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
        // console.log(JSON.stringify(msg));
    }
    else {
        console.error(JSON.stringify(msg));
    }
}

const buy = async (msg_sender, dodo_name, amount, maxPayQuote) => {
    const data = { msg_sender, dodo_name, amount, maxPayQuote };
    // console.log(data);
    const transactionResponse = await transactWithConfig("buybasetoken", data);
    logerror(transactionResponse)
}

const sell = async (msg_sender, dodo_name, amount, minReceiveQuote) => {
    const data = { msg_sender, dodo_name, amount, minReceiveQuote };

    const transactionResponse = await transactWithConfig("sellbastoken", data);
    logerror(transactionResponse)
}



const cron = require('node-cron')
async function runJob() {
    let task = cron.schedule(timer_ticker, async () => {
        var s = await GetRandomNum(min, max);
        const a = Number(s).toFixed(6);
        const m = Number(s * 11).toFixed(6);
        console.log(Number(s).toFixed(6), counter++, new Date())
        const i = s % 2;
        const ii = (i+1) % 2;
        sell(msg_senders[i], dodo_names[i], to_asset(a, para_names[i][0]), to_asset("0.000000", para_names[i][1]));
        sleep.msleep(freq);
        buy(msg_senders[ii], dodo_names[ii], to_asset(a, para_names[ii][0]), to_asset(m, para_names[ii][1]));
    }, { scheduled: false })

    task.start()
    // task.stop()
    // task.destroy()
    // cron.validate('* * * * * *')


}



async function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}


runJob()

