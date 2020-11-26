
const fs = require('fs')
const { prettyJson } = require("./prettyjson");

async function deployContractjs(user_name, filePath, utils) {
    const wasmFilePath = filePath + ".wasm"
    const abiFilePath = filePath + ".abi"
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

    try {
        const res = await utils.api.transact(
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
        console.log(e)
    }
}

// createNewAccount("gbp2usd11111", pub_key, pub_key);
// createNewAccount("hkd2usd11111", pub_key, pub_key);
// deployContract("gbp2usd11111");
//  deployContract("hkd2usd11111");
module.exports = { deployContractjs };