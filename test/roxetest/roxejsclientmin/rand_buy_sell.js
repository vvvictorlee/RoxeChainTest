const { Api, JsonRpc, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const defaultPrivateKey = "5JZDFmwRwxJU2j1fugGtLLaNp2bcAP2PKy5zsqNkhn47v3S3e5w";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey])
const rpc = new JsonRpc('http://172.17.3.161:8888', { fetch })


const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');

let env = dotenv.config({})
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);


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
const to_asset = async (value, sym) => {
    return { quantity: value + " " + sym, contract: token_contract };
}

const buy = async (msg_sender, dodo_name, amount, maxPayQuote) => {
    const data = { msg_sender, dodo_name, amount, maxPayQuote };

    await transactWithConfig("buybasetoken", data);
}

const sell = async (msg_sender, dodo_name, amount, minReceiveQuote) => {
    const data = { msg_sender, dodo_name, amount, minReceiveQuote };

    await transactWithConfig("sellbastoken", data);
}

const contract = "roxe.earn";
const msg_senders = ["trader1", "trader2"];
const dodo_names = ["re.usdgbp", "re.usdhkd"];
const para_names = [["USD", "GBP"],["USD", "HKD"]];
const mintues = 1000 * 60;
let counter = 0;
const min = 50;
const max = 100000;

const cron = require('node-cron')
async function runJob() {
    let task = cron.schedule('*/1 * * * * *', async () => {
        var s = await GetRandomNum(min, max);
        const a  = Number(s).toFixed(6);
        console.log(action, Number(s).toFixed(6), counter++, new Date())
        const i = s % 2 ;
        if (i == 0) {
            sell(msg_senders[i], dodo_names[i],to_asset(a,para_names[i]),to_asset(a,para_names[i]));
        }
        else {
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

