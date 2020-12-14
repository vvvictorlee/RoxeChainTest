
const fs = require('fs')
const {prettyJson}  = require("./prettyjson");

const buyram = async (
    account_name,api
) => {
    try {
        const result = await api.transact(
            {
                actions: [
                    {
                        account: 'roxe',
                        name: 'buyrambytes',
                        authorization: [
                            {
                                actor: 'roxe1',
                                permission: 'active',
                            },
                        ],
                        data: {
                            payer: 'roxe1',
                            receiver: account_name,
                            bytes: 81920,
                        },
                    }
                ],
            },
            {
                blocksBehind: 3,
                expireSeconds: 30,
            }
        );
        // console.log('transaction_id is : ', result.transaction_id);
        // return trans_id;
        prettyJson(result);
    } catch (err) {
        console.log('error is : ___', err);
    }
};



const createNewAccount = async (
    account_name,
    owner_publicKey,
    active_publicKey,api
) => {
    try {
        const result = await api.transact(
            {
                actions: [
                    {
                        account: 'roxe',
                        name: 'newaccount',
                        authorization: [
                            {
                                actor: 'roxe1',
                                permission: 'active',
                            },
                        ],
                        data: {
                            creator: 'roxe1',
                            name: account_name,
                            owner: {
                                threshold: 1,
                                keys: [
                                    {
                                        key: owner_publicKey,
                                        weight: 1,
                                    },
                                ],
                                accounts: [],
                                waits: [],
                            },
                            active: {
                                threshold: 1,
                                keys: [
                                    {
                                        key: active_publicKey,
                                        weight: 1,
                                    },
                                ],
                                accounts: [],
                                waits: [],
                            },
                        },
                    },
                    {
                        account: 'roxe',
                        name: 'buyrambytes',
                        authorization: [
                            {
                                actor: 'roxe1',
                                permission: 'active',
                            },
                        ],
                        data: {
                            payer: 'roxe1',
                            receiver: account_name,
                            bytes: 8192000,
                        },
                    },
                    {
                        account: 'roxe',
                        name: 'delegatebw',
                        authorization: [
                            {
                                actor: 'roxe1',
                                permission: 'active',
                            },
                        ],
                        data: {
                            from: 'roxe1',
                            receiver: account_name,
                            stake_net_quantity: '10000.0000 ROC',
                            stake_cpu_quantity: '10000.0000 ROC',
                            transfer: false,
                        },
                    },
                ],
            },
            {
                blocksBehind: 3,
                expireSeconds: 30,
            }
        );
        // console.log('transaction_id is : ', JSONresult);
        // return trans_id;
        prettyJson(result);
    } catch (err) {
        console.log('error is : ___', err);
    }
};

async function deployContract(user_name,wasmFilePath,abiFilePath,utils) {
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
        await utils.api.transact(
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
    }
    catch (e) {
        console.log(e)
    }
}

// createNewAccount("gbp2usd11111", pub_key, pub_key);
// createNewAccount("hkd2usd11111", pub_key, pub_key);
    // deployContract("gbp2usd11111");
//  deployContract("hkd2usd11111");
