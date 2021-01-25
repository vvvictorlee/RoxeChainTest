const { Api, JsonRpc, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const defaultPrivateKey = "5J6BA1U4QdQPwkFWsphU96oBusvsA8V2UJDtMtKgNneakBK9YrN";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey])
const rpc = new JsonRpc('http://172.17.3.161:7878', { fetch })


const dotenv = require('dotenv');

let env = dotenv.config({})
if (env.error) throw env.error;
// const dotenvParseVariables = require('dotenv-parse-variables');
// env = dotenvParseVariables(env.parsed);


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

const token_contract = "roxe.ro";
const to_asset = (value, sym) => {
    const s = { "quantity": value + " " + sym, contract: token_contract };
    console.log(s);
    return s;
}

const logerror = async (msg) => {
    if (undefined != msg && msg.hasOwnProperty(processed) && msg.processed.hasOwnProperty(error_code) && msg.processed.error_code != null) {
        // console.log(JSONG.stringify(msg));
    }
    else {
        console.error(JSONG.stringify(msg));
    }
}

const buy = async (msg_sender, dodo_name, amount, maxPayQuote) => {
    // const data = { msg_sender:msg_sender, dodo_name:dodo_name, amount:amount, maxPayQuote:maxPayQuote };
    const data = { msg_sender, dodo_name, amount, maxPayQuote };
    console.log(data);
    const transactionResponse = await transactWithConfig("buybasetoken", data);
    console.log(transactionResponse)
}

const sell = async (msg_sender, dodo_name, amount, minReceiveQuote) => {
    const data = { msg_sender, dodo_name, amount, minReceiveQuote };
    // const data = { msg_sender:msg_sender, dodo_name:dodo_name, amount:amount, minReceiveQuote:minReceiveQuote };

    const transactionResponse = await transactWithConfig("sellbastoken", data);
    console.log(transactionResponse)
}


const contract = "roxeearntest";//"roxe.earn";
const msg_senders = ["bob111111111", "bob111111111"];
const dodo_names = ["usd2gbp44444", "usd2hkd44444"];//["re.usdgbp", "re.usdhkd"];
const para_names = [["USD", "GBP"], ["USD", "HKD"]];
const mintues = 1000 * 60;
let counter = 0;
const min = 1;
const max = 10;

const cron = require('node-cron')
async function runJob() {
    let task = cron.schedule('*/1 * * * * *', async () => {
        var s = await GetRandomNum(min, max);
        const a = Number(s).toFixed(6);
        const m = Number(s * 11).toFixed(6);
        console.log(Number(s).toFixed(6), counter++, new Date())
        const i = s % 2;
        if (i == 0) {
            sell(msg_senders[i], dodo_names[i], to_asset(a, para_names[i][0]), to_asset("0.000000", para_names[i][1]));
        }
        else {
            buy(msg_senders[i], dodo_names[i], to_asset(a, para_names[i][0]), to_asset(m, para_names[i][1]));
        }


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

