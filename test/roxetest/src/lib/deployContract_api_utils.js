
const fs = require('fs')
const { prettyJson } = require("./prettyjson");

const path = require('path');


async function deployContractjs(user_name, filePath, utils) {
    console.log("deployContractjs==",user_name,"==");
    // console.log(__dirname);
    // console.log(__filename);
    // console.log(process.cwd());
    // console.log(path.resolve('./'));
    const fullfilePath = path.join(__dirname, filePath);
    // console.log(fullfilePath);
    const wasmFilePath = fullfilePath + ".wasm"
    const abiFilePath = fullfilePath + ".abi"
    const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex')

    const buffer = new utils.Serialize.SerialBuffer({
        textEncoder: utils.api.textEncoder,
        textDecoder: utils.api.textDecoder,
    })

    let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf8'))
    const abiDefinitions = utils.api.abiTypes.get('abi_def')
    abiJSON = abiDefinitions.fields.reduce(
        (acc, { name: fieldName }) =>
            Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
        abiJSON
    )
    abiDefinitions.serialize(buffer, abiJSON)
    let serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex')

    let res;
    try {
        res = await utils.api.transact(
            {
                actions: [
                    {
                        account: 'roxe',
                        name: 'setcode',
                        authorization: [
                            {
                                actor: user_name,
                                permission: 'active',
                            },
                        ],
                        data: {
                            account: user_name,
                            vmtype: '0',
                            vmversion: '0',
                            code: wasmHexString,
                        },
                    },
                    {
                        account: 'roxe',
                        name: 'setabi',
                        authorization: [
                            {
                                actor: user_name,
                                permission: 'active',
                            },
                        ],
                        data: {
                            account: user_name,
                            abi: serializedAbiHexString,
                        },
                    },
                ],
            },
            {
                blocksBehind: 3,
                expireSeconds: 30,
            }
        )
        prettyJson(res);
    }
    catch (e) {
        res = e;
        console.log(e)
    }
    return res;
}

// createNewAccount("gbp2usd11111", pub_key, pub_key);
// createNewAccount("hkd2usd11111", pub_key, pub_key);
// deployContract("gbp2usd11111");
//  deployContract("hkd2usd11111");
module.exports = { deployContractjs };